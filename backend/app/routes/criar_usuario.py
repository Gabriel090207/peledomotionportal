from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.services.auth_service import criar_usuario_e_enviar_email

router = APIRouter(prefix="/usuarios", tags=["Usuários"])


class CriarUsuarioRequest(BaseModel):
    email: EmailStr


@router.post("/criar")
def criar_usuario(data: CriarUsuarioRequest):
    try:
        resultado = criar_usuario_e_enviar_email(data.email)
        return {
            "ok": True,
            "uid": resultado["uid"],
            "email": resultado["email"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
