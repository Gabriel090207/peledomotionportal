import os
import requests
from datetime import datetime


def enviar_email_credenciais(destinatario: str, senha: str):
    api_key = os.getenv("RESEND_API_KEY")
    email_from = os.getenv("EMAIL_FROM", "Pelé do Motion <onboarding@resend.dev>")

    if not api_key:
        raise RuntimeError("RESEND_API_KEY não configurada")

    # Senha iXBrowser = email antes do @
    senha_ixbrowser = destinatario.split("@")[0]

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
                <h1 style="margin:0;font-size:20px;font-weight:800;">
                  🚀 Pelé do Motion
                </h1>
                <p style="margin:6px 0 0;font-size:14px;color:#f6f2ff;">
                  Seu acesso foi liberado
                </p>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:30px;">

                <h2 style="margin:0 0 14px;font-size:22px;">
                  Bem-vindo ao ecossistema Pelé do Motion
                </h2>

                <p style="margin:0 0 24px;color:#b9a7d6;font-size:15px;line-height:1.6;">
                  Abaixo estão suas credenciais e acessos importantes.
                </p>

                <!-- CARD PORTAL -->
                <div style="background:#0f0a1f;border-radius:14px;padding:20px;border:1px solid rgba(255,255,255,.08);margin-bottom:20px;">
                  <strong>🔐 Portal</strong><br><br>
                  Email: {destinatario}<br><br>
                  Senha temporária: <strong>{senha}</strong>
                </div>

                <!-- CARD IXBROWSER -->
                <div style="background:#0f0a1f;border-radius:14px;padding:20px;border:1px solid rgba(255,255,255,.08);margin-bottom:30px;">
                  <strong>🌐 iXBrowser</strong><br><br>
                  Email: {destinatario}<br><br>
                  Senha: <strong>{senha_ixbrowser}</strong>
                </div>

                <!-- BOTÕES 2x2 -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;">
                  <tr>
                    <td align="center">

                      <!-- LINHA 1 -->
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:8px;">
                            <a href="https://wa.me/558491597264"
                              style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:14px 26px;border-radius:999px;font-weight:700;width:220px;text-align:center;">
                              📞 Suporte
                            </a>
                          </td>
                          <td style="padding:8px;">
                            <a href="https://ixbrowser.com/download"
                              style="display:inline-block;background:#0066ff;color:#ffffff;text-decoration:none;padding:14px 26px;border-radius:999px;font-weight:700;width:220px;text-align:center;">
                              🌐 iXBrowser
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- LINHA 2 -->
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:8px;">
                            <a href="https://seuvideo.com/tutorial"
                              style="display:inline-block;background:#ff005c;color:#ffffff;text-decoration:none;padding:14px 26px;border-radius:999px;font-weight:700;width:220px;text-align:center;">
                              🎥 Tutorial
                            </a>
                          </td>
                          <td style="padding:8px;">
                            <a href="https://portal.peledomotion.com"
                              style="display:inline-block;background:#8a00ff;color:#ffffff;text-decoration:none;padding:14px 26px;border-radius:999px;font-weight:700;width:220px;text-align:center;">
                              🚀 Acessar Portal
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <p style="text-align:center;font-size:13px;color:#b9a7d6;">
                  Recomendamos alterar sua senha após o primeiro acesso.
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:18px;text-align:center;background:#06010d;">
                <p style="margin:0;font-size:12px;color:#b9a7d6;">
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
            "subject": "🚀 Seus acessos ao Pelé do Motion",
            "html": html,
        },
        timeout=15,
    )

    if response.status_code >= 400:
        raise RuntimeError(f"Erro ao enviar email: {response.text}")