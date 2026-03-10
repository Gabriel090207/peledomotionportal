from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routes import auth
from app.routes.ixbrowser import router as ixbrowser_router
from app.routes.test_email import router as test_email_router
from app.routes.criar_usuario import router as criar_usuario_router
from app.routes.kiwify_webhook import router as kiwify_router
from app.routes.adspower import router as adspower_router

app = FastAPI()

# ------------------------------
# Perfis em uso (memória)
# ------------------------------
profiles_in_use = set()

# ------------------------------
# CORS
# ------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------
# ROTAS
# ------------------------------
app.include_router(auth.router)
app.include_router(ixbrowser_router)
app.include_router(test_email_router)
app.include_router(criar_usuario_router)
app.include_router(kiwify_router)
app.include_router(adspower_router)

# ------------------------------
# ROOT
# ------------------------------
@app.get("/")
def root():
    return {"status": "API online"}

# ------------------------------
# DOWNLOAD DE ARQUIVOS
# ------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.get("/downloads/{file_name}")
def download_file(file_name: str):

    file_path = os.path.join(BASE_DIR, "downloads", file_name)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Arquivo não encontrado")

    return FileResponse(
        path=file_path,
        filename=file_name,
        media_type="application/octet-stream"
    )