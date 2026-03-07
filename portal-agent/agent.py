from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import uvicorn

app = FastAPI()

# Permite chamadas do seu portal
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# CONFIG ADSPOWER
# ==============================

ADSPOWER_BASE_URL = "http://local.adspower.net:50325"
ADSPOWER_OPEN_PROFILE = f"{ADSPOWER_BASE_URL}/api/v2/browser-profile/start"
ADSPOWER_OPENED_LIST = f"{ADSPOWER_BASE_URL}/api/v2/browser-profile/opened-list"

# 🔥 COLE SUA API KEY AQUI
ADSPOWER_API_TOKEN = "29bc53f626a03c5702cc13b92f5940560083e482b6f6c9d6"

HEADERS = {
    "Authorization": f"Bearer {ADSPOWER_API_TOKEN}",
    "Content-Type": "application/json"
}

# ==============================
# ROTAS
# ==============================

@app.get("/health")
def health():
    return {"status": "running"}


@app.post("/open-profile")
def open_profile(data: dict):
    profile_no = data.get("profile_no") or data.get("profile_id")

    if not profile_no:
        raise HTTPException(status_code=400, detail="profile_no é obrigatório")

    try:
        response = requests.post(
            ADSPOWER_OPEN_PROFILE,
            headers=HEADERS,
            json={
                "profile_no": str(profile_no)
            },
            timeout=60
        )

        result = response.json()

        print("\n==============================")
        print("ADSPOWER RESPONSE:")
        print(result)
        print("==============================\n")

        return result

    except requests.RequestException as e:
        print("Erro ao conectar com AdsPower:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/opened-profiles")
def opened_profiles():
    try:
        response = requests.post(
            ADSPOWER_OPENED_LIST,
            headers=HEADERS,
            json={},
            timeout=60
        )

        result = response.json()

        print("\n==============================")
        print("ADSPOWER OPENED LIST:")
        print(result)
        print("==============================\n")

        return result

    except requests.RequestException as e:
        print("Erro ao buscar perfis abertos:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=3001
    )