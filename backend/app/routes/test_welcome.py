from fastapi import APIRouter
from app.services.email_service import send_welcome_email
from app.templates.welcome_email import welcome_email_template
from app.utils.password_generator import generate_random_password
import os

router = APIRouter()

@router.get("/test-welcome")
def test_welcome():
    email = os.getenv("EMAIL_USER")
    password = generate_random_password()

    html = welcome_email_template(email, password)
    send_welcome_email(email, password, html)

    return {
        "email": email,
        "password": password
    }
