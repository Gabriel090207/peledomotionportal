import requests

IXBROWSER_BASE_URL = "http://127.0.0.1:53200/api/v2"


def list_profiles(page: int = 1, limit: int = 10):
    url = f"{IXBROWSER_BASE_URL}/profile-list"
    payload = {
        "page": page,
        "limit": limit
    }

    response = requests.post(url, json=payload, timeout=15)
    response.raise_for_status()
    return response.json()
