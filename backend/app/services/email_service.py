import os
import smtplib
import socket
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
SENDER_NAME = os.getenv("SENDER_NAME", "Pelé do Motion")

def send_welcome_email(to_email: str, password: str, html: str):
    try:
        msg = MIMEMultipart("alternative")
        msg["From"] = f"{SENDER_NAME} <{EMAIL_USER}>"
        msg["To"] = to_email
        msg["Subject"] = "🎉 Seu acesso ao Pelé do Motion"

        msg.attach(MIMEText(html, "html"))

        # timeout curto pra não travar a API
        socket.setdefaulttimeout(10)

        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, to_email, msg.as_string())
        server.quit()

        print("[EMAIL] Gmail SMTP enviado com sucesso")

    except Exception as e:
        print("[EMAIL ERROR]", str(e))
        # não quebra a API
