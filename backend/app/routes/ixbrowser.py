from fastapi import APIRouter, HTTPException
import requests
from app.services.ixbrowser_service import list_profiles

router = APIRouter(prefix="/ixbrowser", tags=["ixbrowser"])


# =========================
# LISTAR PROFILES (JÁ OK)
# =========================
@router.get("/profiles")
def get_all_profiles(page: int = 1, limit: int = 100):
    print("➡️ ENTROU NA ROTA /ixbrowser/profiles")

    try:
        response = list_profiles(page=page, limit=limit)
        print("📦 RESPONSE DO IXBROWSER:", response)
    except Exception as e:
        print("❌ ERRO NO list_profiles:", e)
        raise HTTPException(status_code=500, detail=str(e))

    profiles_raw = []

    if isinstance(response, dict):
        data_block = response.get("data")
        if isinstance(data_block, dict):
            profiles_raw = data_block.get("data", [])
        elif isinstance(data_block, list):
            profiles_raw = data_block
    elif isinstance(response, list):
        profiles_raw = response

    print("📄 PROFILES RAW:", profiles_raw)

    profiles = []
    for p in profiles_raw:
        if not isinstance(p, dict):
            continue

        profiles.append({
            "profile_id": p.get("profile_id"),
            "name": p.get("name"),
            "group": p.get("group_name"),
            "tag": p.get("tag_name"),
        })

    print("✅ PROFILES FINAL:", profiles)

    return {"profiles": profiles}


# =========================
# 🔥 ABRIR PROFILE (NOVA)
# =========================
@router.post("/profiles/{profile_id}/open")
def open_profile(profile_id: int):
    print(f"🚀 ABRINDO PROFILE {profile_id}")

    try:
        response = requests.post(
            "http://127.0.0.1:53200/api/v2/profile-open",
            json={"profile_id": profile_id},
            timeout=15
        )

        print("📦 RESPONSE OPEN:", response.text)
        response.raise_for_status()

        return response.json()

    except requests.RequestException as e:
        print("❌ ERRO AO ABRIR PROFILE:", e)
        raise HTTPException(
            status_code=500,
            detail="Erro ao abrir perfil no ixBrowser"
        )
