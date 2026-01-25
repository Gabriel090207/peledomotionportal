import os
import resend

# Configura API Key
resend.api_key = os.getenv("RESEND_API_KEY")

EMAIL_FROM = os.getenv(
    "EMAIL_FROM",
    "Pelé do Motion <onboarding@resend.dev>"
)

def send_welcome_email(to_email: str, password: str, html: str):
    """
    Envia email de boas-vindas via Resend.
    Mantém a mesma assinatura usada antes (drop-in replacement).
    """
    try:
        response = resend.Emails.send({
            "from": EMAIL_FROM,
            "to": to_email,
            "subject": "🎉 Seu acesso ao Pelé do Motion",
            "html": html,
        })

        print("[EMAIL] Resend enviado com sucesso:", response)

    except Exception as e:
        # IMPORTANTE: não quebrar a API
        print("[EMAIL ERROR]", str(e))
