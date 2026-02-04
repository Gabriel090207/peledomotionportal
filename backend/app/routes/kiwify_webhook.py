from fastapi import APIRouter, Request, HTTPException
from app.services.auth_service import criar_usuario_e_enviar_email

router = APIRouter(prefix="/webhook", tags=["Webhooks"])


@router.post("/kiwify")
async def webhook_kiwify(request: Request):
    payload = await request.json()

    print("📦 WEBHOOK KIWIFY RECEBIDO:")
    print(payload)

    try:
        event_type = payload.get("webhook_event_type")
        order_status = payload.get("order_status")

        # valida evento correto
        if event_type != "order_approved" or order_status != "paid":
            print("ℹ️ Evento ignorado:", event_type, order_status)
            return {"ok": True, "ignored": True}

        # ------------------------------
        # dados do cliente
        # ------------------------------
        customer = payload.get("Customer", {})
        email = customer.get("email")
        nome = customer.get("full_name")

        if not email:
            raise ValueError("Email do cliente não encontrado")

        print("✅ VENDA APROVADA")
        print("Email:", email)
        print("Nome:", nome)

        # ------------------------------
        # IDENTIFICA O PLANO COMPRADO
        # ------------------------------
        product = payload.get("Product", {})
        nome_produto = product.get("product_name", "").lower()

        print("Produto recebido:", nome_produto)

        if "ouro" in nome_produto:
            plano = "ouro"
        else:
            plano = "prata"

        print("Plano detectado:", plano)

        # ------------------------------
        # cria usuário e salva plano
        # ------------------------------
        resultado = criar_usuario_e_enviar_email(email, plano)

        return {
            "ok": True,
            "uid": resultado["uid"],
            "email": resultado["email"],
            "plano": plano
        }

    except Exception as e:
        print("❌ ERRO NO WEBHOOK:", str(e))
        raise HTTPException(status_code=400, detail=str(e))
