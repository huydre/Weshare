from django.urls import path
from .views import(
    UserStoryListViewSet,
    UsersHasStories
)

urlpatterns = [
    path('user-story/<str:user_id>/', UserStoryListViewSet.as_view(), name= 'user-story'),
    path('user-has-story/', UsersHasStories.as_view(), name= 'user-has-story'),
]