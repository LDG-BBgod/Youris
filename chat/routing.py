from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    path('ws/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
    path('ws/usertime/<str:room_name>/', consumers.UserTime.as_asgi()),
    path('ws/companytime/<str:room_name>/', consumers.CompanyTime.as_asgi()),
]
