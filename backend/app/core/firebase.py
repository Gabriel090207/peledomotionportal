import os
import json
import firebase_admin
from firebase_admin import credentials, firestore, auth

# Inicialização segura do Firebase via ENV (Render / Prod)
if not firebase_admin._apps:
    service_account_json = os.getenv("FIREBASE_SERVICE_ACCOUNT")

    if not service_account_json:
        raise RuntimeError("FIREBASE_SERVICE_ACCOUNT não configurada")

    service_account_info = json.loads(service_account_json)

    cred = credentials.Certificate(service_account_info)
    firebase_admin.initialize_app(cred)

db = firestore.client()
firebase_auth = auth
