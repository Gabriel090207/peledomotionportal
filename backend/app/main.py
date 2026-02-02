from fastapi import FastAPI
from app.routes import auth
from app.routes.ixbrowser import router as ixbrowser_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.test_email import router as test_email_router
from app.routes.criar_usuario import router as criar_usuario_router
from app.routes.kiwify_webhook import router as kiwify_router
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# rotas
app.include_router(auth.router)
app.include_router(ixbrowser_router)
app.include_router(test_email_router)
app.include_router(criar_usuario_router)
app.include_router(kiwify_router)

# pasta de downloads
app.mount("/downloads", StaticFiles(directory="public"), name="downloads")

@app.get("/")
def root():
    return {"status": "API online"}
