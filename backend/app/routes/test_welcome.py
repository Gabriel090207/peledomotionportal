from fastapi import APIRouter
from app.utils.password_generator import generate_random_password
from app.services.email_service import send_welcome_email
import os

router = APIRouter()

@router.get("/test-welcome")
def test_welcome():
    email = os.getenv("EMAIL_USER")
    password = generate_random_password()
    send_welcome_email(email, password)
    return {
        "email": email,
        "password": password
    }
