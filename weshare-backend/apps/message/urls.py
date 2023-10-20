from django.urls import path
from .views import(
    UserMessagesViewSet,
    ParticipantsMessagesViewSet
)

urlpatterns = [
    path('user-message/<str:user_id>/', UserMessagesViewSet.as_view(), name= 'user-messages'),
    path('participants-message/<str:user1_id>/<str:user2_id>/', ParticipantsMessagesViewSet.as_view(), name= 'participants-messages'),
]
