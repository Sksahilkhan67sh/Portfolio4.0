# Sahil Khan — Portfolio (Vintage Notebook Edition)

A full redesign of the existing PORTFOLIO_SAHIL project: same real content
(experience, projects, education, skills, resume), a new vintage
notebook/journal UI, and a production-ready FastAPI backend for the contact
form.

```
sahil-portfolio/
├── frontend/    React + Vite + Tailwind + Framer Motion + Lenis
├── backend/     FastAPI + SQLAlchemy + JWT admin + SMTP email
├── nginx/       Reverse-proxy config used by the frontend's production image
├── docker/      (reserved for extra compose overrides / scripts)
└── docker-compose.yml
```

## Quick start — local development

**Backend**
```bash
cd backend
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
cp .env.example .env
# Generate an admin password hash and paste it into ADMIN_PASSWORD_HASH:
./venv/bin/python -c "from passlib.hash import bcrypt; print(bcrypt.hash('your-password'))"
./venv/bin/uvicorn main:app --reload --port 8000
```

**Frontend** (in a second terminal)
```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:8000
npm run dev
```

Visit `http://localhost:5173`. The contact form posts to the backend at
`http://localhost:8000/api/contact`.

## Quick start — Docker (production-style)

```bash
cp backend/.env.example backend/.env
# edit backend/.env: set ADMIN_PASSWORD_HASH, JWT_SECRET_KEY, SMTP_* creds

docker compose up --build
```

This builds two images:
- `backend` — Gunicorn + Uvicorn workers serving the FastAPI app on an
  internal port (not exposed to the host directly)
- `frontend` — a static Vite build served by nginx, which also reverse-proxies
  `/api/*` to the backend container over the Docker network

The site is available at `http://localhost`.

## Admin dashboard

There's no separate admin UI shipped in this pass — the backend exposes
everything a dashboard needs (`GET /api/contact/messages` with search +
pagination, `PATCH /api/contact/{id}/read`, `DELETE /api/contact/{id}`,
`GET /api/contact/messages/export` for CSV), protected by
`POST /api/auth/login` (JWT bearer token). You can drive these directly, from
a small internal tool, or ask for a dedicated admin frontend as a follow-up.

## Security notes

- Rate limiting: 5 requests / 10 minutes per IP on `POST /api/contact`
  (configurable via `CONTACT_RATE_LIMIT` in `backend/.env`)
- Input sanitization strips HTML/JS from all contact fields (XSS protection)
- A honeypot field (`website`) silently drops bot submissions
- Basic keyword + link-count spam heuristics reject obvious spam
- SQL injection isn't reachable — all queries go through SQLAlchemy's ORM
- JWT-protected admin endpoints; passwords hashed with bcrypt
- Security response headers set on both the API and the nginx layer
- CORS locked to `FRONTEND_ORIGIN` from `backend/.env`

## What's carried over unchanged

All content — name, title, summary, experience, skills, projects (with real
GitHub/demo links), education — comes directly from the original
`PORTFOLIO_SAHIL-main/data.py`. Project screenshots and the profile photo are
the same image files, only re-cropped/styled in CSS, not regenerated.
