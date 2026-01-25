from fastapi import FastAPI
from app.routes import auth
from app.routes.ixbrowser import router as ixbrowser_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.test_welcome import router as test_welcome_router



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
app.include_router(test_welcome_router)


@app.get("/")
def root():
    return {"status": "API online"}
