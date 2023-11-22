from django.shortcuts import render
from apps.user.serializers import UserSerializer
from apps.user.models import User
from .serializers import (
    StoriesSerializer,
    StoriesCreateSerializer
)
from rest_framework import viewsets
from .models import Stories
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

def is_owner(request, instance):
    return request.user == instance.author or request.user.is_staff # boolean value

class StoriesViewSet(viewsets.ModelViewSet):
    serializer_class = StoriesSerializer
    
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = Stories.objects.all()
            return self.queryset
        else:
            return self.queryset

    def get_object(self, pk=None):
        return get_object_or_404(Stories, pk=pk)
    
    def create(self, request):
        stories_serializer = StoriesCreateSerializer(data=request.data)
        if stories_serializer.is_valid():
            stories_serializer.save()
            return Response(stories_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(stories_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        stories = self.get_object(pk=pk)
        stories_serializer = self.serializer_class(stories)
        return Response(stories_serializer.data, status=status.HTTP_200_OK)
    
    def destroy(self, request, pk=None):
        stories = self.get_object(pk=pk)
        if not is_owner(request, stories):
            return Response({'message': 'You are not authorized to perform this action'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            stories.delete()
            return Response({'message': 'Post deleted successfully'}, status=status.HTTP_200_OK)
        
class UserStoryListViewSet(APIView):
    serializer_class = StoriesSerializer

    def get(self,request, user_id):
        user_stories = Stories.objects.filter(author=user_id)
        serializer = StoriesSerializer(user_stories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UsersHasStories(APIView):
    def get(self, request):
        users_with_stories = User.objects.filter(stories__isnull=False).distinct()
        serializer = UserSerializer(users_with_stories, many=True)
        return Response(serializer.data)