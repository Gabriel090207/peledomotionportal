from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.services.email_service import enviar_email_credenciais

router = APIRouter(prefix="/test-email", tags=["Test Email"])


class TestEmailRequest(BaseModel):
    email: EmailStr
    senha: str = "SenhaTeste123"


@router.post("/")
def testar_email(data: TestEmailRequest):
    try:
        enviar_email_credenciais(
            destinatario=data.email,
            senha=data.senha
        )
        return {"ok": True, "msg": f"E-mail enviado para {data.email}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
