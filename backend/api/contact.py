import csv
import io

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, status
from fastapi.responses import StreamingResponse
from sqlalchemy import func
from sqlalchemy.orm import Session

from database.session import get_db
from middlewares.rate_limit import limiter
from models.contact_message import ContactMessage
from schemas.contact import ContactCreate, ContactListOut, ContactOut
from services.email_service import send_contact_emails
from utils.config import get_settings
from utils.logger import get_logger
from utils.sanitize import clean_text, looks_like_spam
from utils.security import get_current_admin

router = APIRouter(prefix="/api/contact", tags=["contact"])
settings = get_settings()
logger = get_logger(__name__)


@router.post("", status_code=status.HTTP_201_CREATED)
@limiter.limit(settings.contact_rate_limit)
def create_contact_message(
    request: Request,
    payload: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    # Honeypot: bots fill every field, real visitors never see/fill this one.
    if payload.website:
        logger.info("Honeypot triggered — silently dropping submission")
        return {"message": "Message sent — thanks for writing, I'll reply soon."}

    name = clean_text(payload.name)
    subject = clean_text(payload.subject)
    message = clean_text(payload.message)

    if looks_like_spam(name, subject, message):
        logger.warning("Spam-like submission blocked from %s", request.client.host if request.client else "unknown")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Your message looks like spam. Please rewrite it without links or promotional text.",
        )

    entry = ContactMessage(
        name=name,
        email=str(payload.email),
        subject=subject,
        message=message,
        ip_address=request.client.host if request.client else None,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)

    background_tasks.add_task(
        send_contact_emails, name, str(payload.email), subject, message
    )

    return {"message": "Message sent — thanks for writing, I'll reply soon."}


@router.get("/messages", response_model=ContactListOut)
def list_messages(
    page: int = 1,
    page_size: int = 20,
    search: str | None = None,
    unread_only: bool = False,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    page = max(page, 1)
    page_size = min(max(page_size, 1), 100)

    query = db.query(ContactMessage)
    if search:
        like = f"%{search}%"
        query = query.filter(
            (ContactMessage.name.ilike(like))
            | (ContactMessage.email.ilike(like))
            | (ContactMessage.subject.ilike(like))
            | (ContactMessage.message.ilike(like))
        )
    if unread_only:
        query = query.filter(ContactMessage.is_read.is_(False))

    total = query.with_entities(func.count(ContactMessage.id)).scalar() or 0
    items = (
        query.order_by(ContactMessage.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    return ContactListOut(total=total, page=page, page_size=page_size, items=items)


@router.get("/messages/export")
def export_messages_csv(
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    rows = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()

    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["id", "name", "email", "subject", "message", "ip_address", "is_read", "created_at"])
    for r in rows:
        writer.writerow([r.id, r.name, r.email, r.subject, r.message, r.ip_address, r.is_read, r.created_at])
    buffer.seek(0)

    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=contact_messages.csv"},
    )


@router.patch("/{message_id}/read", response_model=ContactOut)
def mark_as_read(
    message_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    entry = db.get(ContactMessage, message_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Message not found")
    entry.is_read = True
    db.commit()
    db.refresh(entry)
    return entry


@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    entry = db.get(ContactMessage, message_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(entry)
    db.commit()
    return None
