from django.urls import path
from .views import (UnfollowViewSet, FollowListViewSet)

urlpatterns = [
     path('unfollow/<int:follower>/<int:following>/', UnfollowViewSet.as_view(), name='unfollow'),
     path('followlist/<int:user_id>/', FollowListViewSet.as_view(), name='followlist'),    
]
