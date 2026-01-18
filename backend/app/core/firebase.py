import firebase_admin
from firebase_admin import credentials, firestore, auth
import os

# Caminho absoluto até app/core
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SERVICE_ACCOUNT_PATH = os.path.join(
    BASE_DIR,
    "serviceAccountKey.json"
)

if not firebase_admin._apps:
    cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
    firebase_admin.initialize_app(cred)

db = firestore.client()
firebase_auth = auth
