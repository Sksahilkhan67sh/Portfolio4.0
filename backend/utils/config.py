from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_env: str = "development"
    app_name: str = "AlignCraft Portfolio API"
    frontend_origin: str = "http://localhost:5173"

    database_url: str = "sqlite:///./database/app.db"

    jwt_secret_key: str = "insecure-dev-key-change-me"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60

    admin_username: str = "admin"
    admin_password_hash: str = ""

    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_from_email: str = "no-reply@example.com"
    smtp_from_name: str = "Portfolio"
    admin_notify_email: str = ""
    email_enabled: bool = True

    contact_rate_limit: str = "5/10minutes"

    @property
    def is_production(self) -> bool:
        return self.app_env.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()
