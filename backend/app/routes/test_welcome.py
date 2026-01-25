from fastapi import APIRouter
from pydantic import BaseModel

from app.services.email_service import send_welcome_email
from app.templates.welcome_email import render_welcome_email

router = APIRouter()

class TestWelcomeBody(BaseModel):
    email: str
    password: str

@router.post("/test-welcome")
def test_welcome(data: TestWelcomeBody):
    html = render_welcome_email(
        email=data.email,
        password=data.password
    )

    send_welcome_email(
        to_email=data.email,
        password=data.password,
        html=html
    )

    return {
        "ok": True,
        "email": data.email
    }
