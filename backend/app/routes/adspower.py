import pyotp
from flask import Blueprint, jsonify

adspower_bp = Blueprint("adspower", __name__)

# mesma secret usada no Authenticator
SECRET_ADSPOWER = "TBR5NVNRSUHSJ2UUR2ADAEPWBIWBTTPD"


@adspower_bp.route("/gerar-codigo", methods=["POST"])
def gerar_codigo():

    try:

        totp = pyotp.TOTP(SECRET_ADSPOWER)

        codigo = totp.now()

        return jsonify({
            "ok": True,
            "code": codigo
        }), 200

    except Exception as e:

        return jsonify({
            "ok": False,
            "error": str(e)
        }), 500