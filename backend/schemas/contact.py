from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    # Honeypot field: real users never fill this in. Bots that
    # auto-fill every input will trip it and get silently rejected.
    website: str | None = None

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name is required")
        if len(v) > 120:
            raise ValueError("Name is too long")
        return v

    @field_validator("subject")
    @classmethod
    def subject_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Subject is required")
        if len(v) > 200:
            raise ValueError("Subject is too long")
        return v

    @field_validator("message")
    @classmethod
    def message_min_length(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 20:
            raise ValueError("Message must be at least 20 characters")
        if len(v) > 5000:
            raise ValueError("Message is too long")
        return v


class ContactOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    subject: str
    message: str
    ip_address: str | None
    is_read: bool
    created_at: datetime


class ContactListOut(BaseModel):
    total: int
    page: int
    page_size: int
    items: list[ContactOut]
