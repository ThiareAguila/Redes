from instagrapi import Client

cl = Client()
cl.login(USERNAME, PASSWORD)

media = cl.photo_upload(
    "/app/image.jpg",
    "Test caption for photo with #hashtags and mention users such @example",
    extra_data={
        "custom_accessibility_caption": "alt text example",
        "like_and_view_counts_disabled": 1,
        "disable_comments": 1,
    }
)