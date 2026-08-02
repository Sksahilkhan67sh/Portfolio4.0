from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from database.session import get_db
from middlewares.rate_limit import limiter
from schemas.auth import LoginRequest, TokenResponse
from utils.config import get_settings
from utils.security import create_access_token, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])
settings = get_settings()


@router.post("/login", response_model=TokenResponse)
@limiter.limit("10/10minutes")
def login(request: Request, payload: LoginRequest, db: Session = Depends(get_db)):
    if payload.username != settings.admin_username or not verify_password(
        payload.password, settings.admin_password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    token = create_access_token(subject=payload.username)
    return TokenResponse(access_token=token)
