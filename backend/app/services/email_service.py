import os
import requests
from datetime import datetime


def enviar_email_credenciais(destinatario: str, senha: str):
    api_key = os.getenv("RESEND_API_KEY")
    email_from = os.getenv("EMAIL_FROM", "Pelé do Motion <onboarding@resend.dev>")

    if not api_key:
        raise RuntimeError("RESEND_API_KEY não configurada")

    html = f"""
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#07040d;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#07040d;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0"
            style="
              background:linear-gradient(180deg,#0d0720,#07040d);
              border-radius:18px;
              box-shadow:0 24px 60px rgba(0,0,0,.55);
              color:#ffffff;
              overflow:hidden;
            ">

            <!-- HEADER -->
            <tr>
              <td style="background:#8a00ff;padding:22px 30px;">
                <h1 style="margin:0;font-size:20px;color:#ffffff;font-weight:800;">
                  🚀 Pelé do Motion
                </h1>
                <p style="margin:6px 0 0;font-size:14px;color:#f6f2ff;">
                  Seu acesso ao portal foi liberado
                </p>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:30px;">
                <h2 style="margin:0 0 10px;color:#ffffff;font-size:22px;">
                  Bem-vindo ao painel mais completo de IA do mercado
                </h2>

                <p style="margin:0 0 24px;color:#b9a7d6;font-size:15px;line-height:1.6;">
                  Centralize ferramentas premium, automatize processos e potencialize
                  sua performance digital em um só lugar.
                </p>

                <!-- CARD -->
                <div style="
                  background:#0f0a1f;
                  border-radius:14px;
                  padding:20px;
                  border:1px solid rgba(255,255,255,.08);
                ">
                  <p style="margin:0 0 6px;color:#b9a7d6;font-size:13px;">
                    Email de acesso
                  </p>
                  <p style="margin:0 0 14px;color:#ffffff;font-size:15px;font-weight:600;">
                    {destinatario}
                  </p>

                  <p style="margin:0 0 6px;color:#b9a7d6;font-size:13px;">
                    Senha temporária
                  </p>
                  <p style="margin:0;color:#ffffff;font-size:16px;font-weight:700;">
                    {senha}
                  </p>
                </div>

                <!-- BUTTON -->
                <div style="text-align:center;margin:28px 0;">
                  <a href="https://peledomotionportal.netlify.app/login"
                    style="
                      display:inline-block;
                      background:#8a00ff;
                      color:#ffffff !important;
                      text-decoration:none;
                      padding:14px 36px;
                      border-radius:999px;
                      font-weight:700;
                      font-size:15px;
                    ">
                    Acessar o portal
                  </a>
                </div>

                <p style="margin:0;color:#b9a7d6;font-size:13px;text-align:center;">
                  Recomendamos alterar sua senha após o primeiro acesso.
                </p>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:18px;text-align:center;background:#06010d;">
                <p style="margin:0;color:#b9a7d6;font-size:12px;">
                  © {datetime.now().year} Pelé do Motion — Todos os direitos reservados
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
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
