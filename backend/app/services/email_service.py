import os
import requests
from datetime import datetime


def enviar_email_credenciais(destinatario: str, senha: str):
    api_key = os.getenv("RESEND_API_KEY")
    email_from = os.getenv("EMAIL_FROM", "Pelé do Motion <onboarding@resend.dev>")

    if not api_key:
        raise RuntimeError("RESEND_API_KEY não configurada")

    html = f"""
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

    response = requests.post(
        "https://api.resend.com/emails",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "from": email_from,
            "to": [destinatario],
            "subject": "🚀 Seu acesso ao Pelé do Motion foi liberado",
            "html": html,
        },
        timeout=15,
    )

    if response.status_code >= 400:
        raise RuntimeError(f"Erro ao enviar email: {response.text}")
