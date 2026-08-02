import re

import bleach

SPAM_KEYWORDS = (
    "viagra",
    "casino",
    "crypto airdrop",
    "make money fast",
    "bitcoin investment",
    "click here now",
    "http://bit.ly",
)

URL_PATTERN = re.compile(r"https?://\S+")


def clean_text(value: str) -> str:
    """Strip HTML/JS and collapse whitespace to prevent XSS payloads."""
    stripped = bleach.clean(value, tags=[], attributes={}, strip=True)
    return re.sub(r"\s+", " ", stripped).strip()


def looks_like_spam(name: str, subject: str, message: str) -> bool:
    haystack = f"{name} {subject} {message}".lower()
    if any(keyword in haystack for keyword in SPAM_KEYWORDS):
        return True
    # more than 2 links in a message is a strong spam signal
    if len(URL_PATTERN.findall(message)) > 2:
        return True
    return False
