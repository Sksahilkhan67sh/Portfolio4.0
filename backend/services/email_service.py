import smtplib
import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from mailer.templates import admin_notification_html, visitor_confirmation_html
from utils.config import get_settings
from utils.logger import get_logger

settings = get_settings()
logger = get_logger(__name__)

MAX_RETRIES = 2


def _send(to_email: str, subject: str, html_body: str) -> bool:
    if not settings.email_enabled:
        logger.info("Email disabled — skipping send to %s", to_email)
        return True

    if not settings.smtp_username or not settings.smtp_password:
        logger.warning("SMTP credentials not configured — skipping email send")
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{settings.smtp_from_name} <{settings.smtp_from_email}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html"))

    for attempt in range(1, MAX_RETRIES + 2):
        try:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as server:
                server.starttls()
                server.login(settings.smtp_username, settings.smtp_password)
                server.sendmail(settings.smtp_from_email, [to_email], msg.as_string())
            logger.info("Email sent to %s (attempt %d)", to_email, attempt)
            return True
        except Exception as exc:  # noqa: BLE001 — log and retry, never crash the request
            logger.warning("Email send failed (attempt %d) to %s: %s", attempt, to_email, exc)
            if attempt <= MAX_RETRIES:
                time.sleep(1.5 * attempt)
    logger.error("Email permanently failed to %s after retries", to_email)
    return False


def send_contact_emails(name: str, email: str, subject: str, message: str) -> None:
    if settings.admin_notify_email:
        _send(
            settings.admin_notify_email,
            f"[Portfolio] {subject}",
            admin_notification_html(name, email, subject, message),
        )
    _send(email, "Thanks for reaching out", visitor_confirmation_html(name))
