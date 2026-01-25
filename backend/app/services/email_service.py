import os
from datetime import datetime


def enviar_email_credenciais(destinatario: str, senha: str):
    import smtplib
    import ssl
    from email.message import EmailMessage

    # 🔐 Configurações SMTP (SSL direto)
    SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
    EMAIL_USER = os.getenv("EMAIL_USER")
    EMAIL_PASS = os.getenv("EMAIL_PASS")
    SENDER_NAME = os.getenv("SENDER_NAME", "Pelé do Motion")

    assunto = "🚀 Seu acesso ao Pelé do Motion foi liberado"

    corpo_html = f"""
    <div style="background:#07040d;padding:40px;font-family:Arial;color:#f6f2ff">
      <div style="max-width:600px;margin:auto;background:#0f0a1f;border-radius:18px;padding:30px">
        <h2 style="color:#b400ff">Bem-vindo ao Pelé do Motion</h2>
        <p>Email: <strong>{destinatario}</strong></p>
        <p>Senha temporária: <strong>{senha}</strong></p>
        <a href="https://peledomotionportal.netlify.app/login"
           style="display:inline-block;margin-top:20px;padding:12px 24px;
           background:#8a00ff;color:white;text-decoration:none;border-radius:12px">
           Acessar o portal
        </a>
        <p style="margin-top:30px;font-size:12px;opacity:.7">
          {datetime.now().year} • Pelé do Motion
        </p>
      </div>
    </div>
    """

    msg = EmailMessage()
    msg["Subject"] = assunto
    msg["From"] = f"{SENDER_NAME} <{EMAIL_USER}>"
    msg["To"] = destinatario
    msg.add_alternative(corpo_html, subtype="html")

    # ✅ SMTP SSL (porta 465)
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=30) as server:
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)
