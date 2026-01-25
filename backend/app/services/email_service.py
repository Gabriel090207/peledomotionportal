import os
import smtplib
import ssl
from email.message import EmailMessage
from datetime import datetime
from dotenv import load_dotenv

# ===============================
# Carregar variáveis de ambiente
# ===============================
load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
SENDER_NAME = os.getenv("SENDER_NAME", "Pelé do Motion")

PORTAL_URL = "https://peledomotionportal.netlify.app/login"


# ===============================
# Função principal de envio
# ===============================
def enviar_email_credenciais(destinatario: str, senha: str):
    assunto = "🚀 Seu acesso ao Pelé do Motion foi liberado"

    corpo_html = f"""
    <div style="background:#07040d;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;color:#f6f2ff;">
      <div style="
        max-width:600px;
        margin:0 auto;
        background:#0f0a1f;
        border-radius:18px;
        border:1px solid rgba(255,255,255,.08);
        box-shadow:0 24px 60px rgba(0,0,0,.55);
        overflow:hidden;
      ">

        <!-- TOPO -->
        <div style="
          background:linear-gradient(135deg,#8a00ff,#b400ff);
          padding:24px 28px;
        ">
          <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;">
            🚀 Pelé do Motion
          </h1>
          <p style="margin:6px 0 0;font-size:14px;opacity:.9;">
            Seu acesso ao portal foi liberado
          </p>
        </div>

        <!-- CONTEÚDO -->
        <div style="padding:32px 28px;">
          <h2 style="margin-top:0;font-size:20px;color:#f6f2ff;">
            Bem-vindo ao painel mais completo de IA do mercado
          </h2>

          <p style="font-size:15px;line-height:1.6;color:#b9a7d6;">
            Centralize ferramentas premium, automatize processos e potencialize
            sua performance digital em um só lugar.
          </p>

          <!-- CARD DE CREDENCIAIS -->
          <div style="
            margin:26px 0;
            padding:20px;
            background:#07040d;
            border-radius:14px;
            border:1px solid rgba(255,255,255,.08);
          ">
            <p style="margin:0 0 8px;font-size:14px;color:#b9a7d6;">
              Email de acesso
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#f6f2ff;">
              {destinatario}
            </p>

            <p style="margin:0 0 8px;font-size:14px;color:#b9a7d6;">
              Senha temporária
            </p>
            <p style="
              margin:0;
              font-size:18px;
              font-weight:700;
              letter-spacing:1px;
              color:#ffffff;
            ">
              {senha}
            </p>
          </div>

          <!-- BOTÃO -->
          <div style="text-align:center;margin-top:32px;">
            <a href="{PORTAL_URL}"
               style="
                 background:#8a00ff;
                 color:#ffffff;
                 text-decoration:none;
                 padding:14px 34px;
                 border-radius:999px;
                 font-weight:700;
                 font-size:15px;
                 display:inline-block;
               ">
              Acessar o portal
            </a>
          </div>

          <p style="
            margin-top:30px;
            font-size:13px;
            color:#b9a7d6;
            text-align:center;
          ">
            Recomendamos alterar sua senha após o primeiro acesso.
          </p>
        </div>

        <!-- RODAPÉ -->
        <div style="
          background:#07040d;
          text-align:center;
          padding:14px;
          font-size:12px;
          color:#b9a7d6;
        ">
          © {datetime.now().year} Pelé do Motion — Todos os direitos reservados
        </div>

      </div>
    </div>
    """

    msg = EmailMessage()
    msg["Subject"] = assunto
    msg["From"] = f"{SENDER_NAME} <{EMAIL_USER}>"
    msg["To"] = destinatario
    msg.add_alternative(corpo_html, subtype="html")

    context = ssl.create_default_context()

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls(context=context)
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)

    print(f"📧 Email enviado com sucesso para {destinatario}")
