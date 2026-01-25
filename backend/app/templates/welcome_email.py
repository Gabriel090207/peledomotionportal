def welcome_email_template(email: str, password: str) -> str:
    return f"""
    <html>
      <body style="margin:0;padding:0;background:linear-gradient(120deg,#1a062e,#0c0216,#06010d);font-family:Arial;color:#f6f2ff">
        <div style="padding:40px 20px">
          <div style="max-width:620px;margin:auto;background:#0f0a1f;border-radius:18px;overflow:hidden">
            <div style="padding:28px;background:linear-gradient(135deg,#8a00ff,#b400ff)">
              <h1 style="margin:0">🚀 Pelé do Motion</h1>
              <p>Seu acesso ao portal foi liberado</p>
            </div>
            <div style="padding:32px">
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Senha:</strong> {password}</p>
              <a href="https://peledomotionportal.netlify.app/login"
                 style="display:inline-block;margin-top:20px;padding:14px 26px;background:#8a00ff;color:#fff;border-radius:999px;text-decoration:none">
                 Acessar o portal
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
    """
