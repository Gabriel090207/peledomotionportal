import os
import json
import firebase_admin
from firebase_admin import credentials, auth, firestore

firebase_auth = None
db = None


def init_firebase():
    """
    Inicializa o Firebase apenas uma vez.
    - Em DEV: usa arquivo firebasekey.json
    - Em PROD (Render): usa variável FIREBASE_SERVICE_ACCOUNT
    """
    global firebase_auth, db

    if firebase_admin._apps:
        return firebase_auth, db

    try:
        # 1️⃣ Tenta usar variável de ambiente (Render / produção)
        cred_json = os.getenv("FIREBASE_SERVICE_ACCOUNT")

        if cred_json:
            cred = credentials.Certificate(json.loads(cred_json))
        else:
            # 2️⃣ Fallback DEV local (arquivo JSON)
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
            key_path = os.path.join(base_dir, "firebasekey.json")

            if not os.path.exists(key_path):
                print("⚠️ Arquivo firebasekey.json não encontrado")
                return None, None

            cred = credentials.Certificate(key_path)

        firebase_admin.initialize_app(cred)
        firebase_auth = auth
        db = firestore.client()

        print("🔥 Firebase inicializado com sucesso")
        return firebase_auth, db

    except Exception as e:
        print("❌ Erro ao inicializar Firebase:", e)
        return None, None
