import pyotp
from fastapi import APIRouter

router = APIRouter()

# mesma secret usada no Authenticator
SECRET_ADSPOWER = "TBR5NVNRSUHSJ2UUR2ADAEPWBIWBTTPD"


@router.post("/gerar-codigo")
def gerar_codigo():
    try:
        totp = pyotp.TOTP(SECRET_ADSPOWER)
        codigo = totp.now()

        return {
            "ok": True,
            "code": codigo
        }

    except Exception as e:
        return {
            "ok": False,
            "error": str(e)
        }