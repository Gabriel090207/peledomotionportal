from fastapi import APIRouter, Request, HTTPException
from app.services.auth_service import criar_usuario_e_enviar_email

router = APIRouter(prefix="/webhook", tags=["Webhooks"])

# Produtos → planos
PRODUTOS = {
    "aca8b4e0-f7ee-11f0-8857-cb2f9626f5f4": "ouro",   # Combo Ouro
    "f436fe80-f7ed-11f0-b62d-bb29bcc4ac63": "prata",  # Combo Prata
}


@router.post("/kiwify")
async def webhook_kiwify(request: Request):
    payload = await request.json()

    print("📦 WEBHOOK KIWIFY RECEBIDO:")
    print(payload)

    try:
        event_type = payload.get("webhook_event_type")
        order_status = payload.get("order_status")

        # aceita apenas venda paga
        if event_type != "order_approved" or order_status != "paid":
            print("ℹ️ Evento ignorado:", event_type, order_status)
            return {"ok": True, "ignored": True}

        # ----------------------
        # Cliente
        # ----------------------
        customer = payload.get("Customer", {})
        email = customer.get("email")

        if not email:
            raise ValueError("Email do cliente não encontrado")

        print("✅ VENDA APROVADA:", email)

        # ----------------------
        # Produto comprado
        # ----------------------
        product = payload.get("Product", {})
        product_id = product.get("product_id")
        product_name = product.get("product_name")

        print("Produto:", product_name)
        print("Product ID:", product_id)

        # define plano pelo produto
        plano = PRODUTOS.get(product_id, "prata")

        print("Plano definido:", plano)

        # ----------------------
        # cria/atualiza usuário
        # ----------------------
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
