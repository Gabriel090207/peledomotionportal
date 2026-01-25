from fastapi import APIRouter
from pydantic import BaseModel
from app.services.email_service import send_welcome_email
from app.templates.welcome_email import welcome_email_template

router = APIRouter()

class TestEmailPayload(BaseModel):
    email: str
    password: str

@router.post("/test-email")
def test_email(payload: TestEmailPayload):
    html = welcome_email_template(payload.email, payload.password)

    send_welcome_email(
        to_email=payload.email,
        password=payload.password,
        html=html
    )

    return {
        "ok": True,
        "email": payload.email
    }
