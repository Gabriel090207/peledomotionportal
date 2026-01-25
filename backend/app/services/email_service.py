import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = int(os.getenv("EMAIL_PORT"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


def send_welcome_email(to_email: str, password: str, html: str):
    msg = MIMEMultipart("alternative")
    msg["From"] = f"Pelé do Motion <{EMAIL_USER}>"
    msg["To"] = to_email
    msg["Subject"] = "🎉 Seu acesso ao Pelé do Motion"

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, to_email, msg.as_string())
