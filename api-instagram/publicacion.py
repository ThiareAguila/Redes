import requests

# Token de acceso y ID del usuario autenticado
access_token = 'AQVOkT7yQXdslqLINQqjE3hdGULjRo_Q7755_-nZWsdI7FeRLLnsSE6wnYwyV7xndVUIc3BTSgha9Wj8tL8NOoprD1HDn52etQ9qNHWZ7w7DInMoRYARp0Qy2CdOR__QswPR3m3V5QTwyDKUA8Vh1eFoc-dyMtDR238Vce_Ot4eRJj_QLaD7-4i2EUQhMyuFpStjPLv8JHKuY6c0I7Xpu_JZWVe0qqYWwVJ_xahWHISGFopdE5sfvj1iXKJ1rR34_X_NaTOJiQOeFCLVkJHYWT3rqKe7FOClwheonAy4lTUEk8Z-SLYapvWcMpISkqULHbWVu7xkTwxmbLZsYpTbKQc7OCVYGQ'
person_id = 'pKflFM2JAV'

# Configurar los encabezados
headers = {
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json',
    'X-Restli-Protocol-Version': '2.0.0'
}

# Datos de la publicación
post_url = 'https://api.linkedin.com/v2/ugcPosts'
post_data = {
    "author": f"urn:li:person:{person_id}",
    "lifecycleState": "PUBLISHED",
    "specificContent": {
        "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
                "text": "Este es un post automatizado desde la API de LinkedIn usando Python."
            },
            "shareMediaCategory": "NONE"
        }
    },
    "visibility": {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
}

# Realizar la publicación
response = requests.post(post_url, headers=headers, json=post_data)
print(response.json())
