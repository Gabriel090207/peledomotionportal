from fastapi import APIRouter, Depends
from app.guards.auth_guard import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.get("/me")
def me(user=Depends(get_current_user)):
    return {
        "uid": user["uid"],
        "email": user["email"]
    }
