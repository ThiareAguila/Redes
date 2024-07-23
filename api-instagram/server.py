import os
from flask import Flask, request, jsonify
from instagrapi import Client
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
@app.route('/upload_photo', methods=['POST'])
def upload_photo():
    try:
        # Get the form data from the request
        username = request.form['username']
        password = request.form['password']
        linkedin = request.form['linkedin']
        person = request.form['person']
        image_path = request.files['image_path']
        caption = request.form['caption']
  
        image_path.save(os.path.join('./', image_path.filename))
        cl = Client()
        cl.login(username, password)

        media = cl.photo_upload(
           os.path.join('./', image_path.filename),
            caption, 
         
        )


        access_token = 'AQVOkT7yQXdslqLINQqjE3hdGULjRo_Q7755_-nZWsdI7FeRLLnsSE6wnYwyV7xndVUIc3BTSgha9Wj8tL8NOoprD1HDn52etQ9qNHWZ7w7DInMoRYARp0Qy2CdOR__QswPR3m3V5QTwyDKUA8Vh1eFoc-dyMtDR238Vce_Ot4eRJj_QLaD7-4i2EUQhMyuFpStjPLv8JHKuY6c0I7Xpu_JZWVe0qqYWwVJ_xahWHISGFopdE5sfvj1iXKJ1rR34_X_NaTOJiQOeFCLVkJHYWT3rqKe7FOClwheonAy4lTUEk8Z-SLYapvWcMpISkqULHbWVu7xkTwxmbLZsYpTbKQc7OCVYGQ'
        person_id = 'pKflFM2JAV'
        
        # Configurar los encabezados
        headers = {
            'Authorization': f'Bearer {linkedin}',
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
        }
        
        # Datos de la publicación
        post_url = 'https://api.linkedin.com/v2/ugcPosts'
        post_data = {
            "author": f"urn:li:person:{person}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": caption
                    },
                    "shareMediaCategory": "NONE",
                            # "media":{
                            #     {
                            #         "status": "READY",
                            #         "media": media,
                            #     }
                            # }
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }
        
        # Realizar la publicación
        response = requests.post(post_url, headers=headers, json=post_data)
      
        return jsonify({'media_id':media.pk})

    except Exception as e:
        # Return an error response
        return jsonify({'error': str(e)}), 500

@app.route('/lasts_post', methods=['POST'])
def last_post():
    try:
        # Get the form data from the request
        username = request.form['username']

        cl = Client()
        user_id = cl.user_id_from_username(username)
        end_cursor = None
        for page in range(3):
         medias, end_cursor = cl.user_medias_paginated(user_id, 1, end_cursor=end_cursor)
      
        return jsonify({'media_id':medias})

    except Exception as e:
        # Return an error response
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True ,use_reloader=True)