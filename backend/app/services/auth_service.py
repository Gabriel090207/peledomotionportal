import secrets
import string
from datetime import datetime, timezone

from app.core.firebase import init_firebase
from app.services.email_service import enviar_email_credenciais


def gerar_senha(tamanho: int = 10) -> str:
    caracteres = string.ascii_letters + string.digits
    return "".join(secrets.choice(caracteres) for _ in range(tamanho))


def criar_usuario_e_enviar_email(email: str, plano: str = "prata"):
    firebase_auth, db = init_firebase()

    if not firebase_auth or not db:
        raise RuntimeError("Firebase não inicializado")

    senha = gerar_senha()

    try:
        # cria usuário
        user = firebase_auth.create_user(
            email=email,
            password=senha
        )
        uid = user.uid

    except Exception:
        # usuário já existe → atualiza senha
        user = firebase_auth.get_user_by_email(email)
        firebase_auth.update_user(user.uid, password=senha)
        uid = user.uid

    # salva usuário no Firestore
    db.collection("usuarios").document(uid).set({
        "email": email,
        "ativo": True,
        "plano": plano,
        "criado_em": datetime.now(timezone.utc).isoformat()
    })

    # envia email de acesso
    enviar_email_credenciais(email, senha)

    return {
        "uid": uid,
        "email": email,
        "plano": plano
    }
