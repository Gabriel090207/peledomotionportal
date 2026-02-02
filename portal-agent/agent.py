from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

IXBROWSER_API = "http://127.0.0.1:53200/api/v2/profile-open"

@app.get("/health")
def health():
    return {"status": "running"}

@app.post("/open-profile")
def open_profile(data: dict):
    profile_id = data.get("profile_id")

    resp = requests.post(
        IXBROWSER_API,
        json={
            "profile_id": profile_id,
            "load_extensions": True,
            "load_profile_info_page": False,
            "cookies_backup": True,
        },
    )

    return resp.json()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3001, log_config=None)
