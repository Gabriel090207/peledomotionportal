from fastapi import APIRouter, Request, HTTPException

from app.services.auth_service import criar_usuario_e_enviar_email

router = APIRouter(
    prefix="/webhook",
    tags=["Webhook Kiwify"]
)


@router.post("/kiwify")
async def kiwify_webhook(request: Request):
    try:
        payload = await request.json()

        print("📦 WEBHOOK KIWIFY RECEBIDO:")
        print(payload)

        event = payload.get("event")

        # Garantia de estrutura mínima
        customer = payload.get("customer", {})
        email = customer.get("email")
        name = customer.get("name")

        if not email:
            raise HTTPException(
                status_code=400,
                detail="Email não encontrado no payload"
            )

        # Só processa venda aprovada
        if event == "SALE_APPROVED":
            print("✅ VENDA APROVADA")
            print("Email:", email)
            print("Nome:", name)

            # 🔥 CHAMA O FLUXO QUE JÁ EXISTE
            resultado = criar_usuario_e_enviar_email(email)

            return {
                "ok": True,
                "status": "usuario_criado",
                "email": resultado["email"],
                "uid": resultado["uid"]
            }

        # Outros eventos são ignorados
        print("ℹ️ Evento ignorado:", event)
        return {"ok": True, "status": "evento_ignorado"}

    except HTTPException:
        raise
    except Exception as e:
        print("❌ ERRO NO WEBHOOK:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
