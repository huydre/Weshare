from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from apps.user.models import User
from .serializers import (FollowSerializer, FollowCreateSerializer)
from .models import Follow
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.generics import DestroyAPIView




class FollowViewSet(viewsets.ModelViewSet):
    serializer_class = FollowSerializer

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.get_serializer().Meta.model.objects.all()
            return self.queryset
        else:
            return self.queryset
    
    def get_object(self, pk=None):
        return get_object_or_404(Follow, pk=pk)
    
    def create(self, request):
        follow_serializer = FollowCreateSerializer(data=request.data)
        if follow_serializer.is_valid():
            follow_serializer.save()
            return Response(follow_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(follow_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

       
class UnfollowViewSet(DestroyAPIView):
    serializer_class = FollowSerializer

    def get_object(self, follower, following):
        # Lấy đối tượng Follow dựa trên `follower` và `following`
        return get_object_or_404(Follow, follower=follower, following=following)

    def destroy(self, request, follower, following):
        # Lấy đối tượng Follow dựa trên `follower` và `following`
        follow = self.get_object(follower, following)

        # Kiểm tra xem đối tượng Follow có được theo dõi bởi người dùng hiện tại không
        if follow.follower == request.user:
            follow.delete()  # Xóa đối tượng Follow nếu người dùng đã theo dõi

            return Response({'message': 'Unfollowed successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'message': 'You are not following this user'}, status=status.HTTP_400_BAD_REQUEST)    

    
class FollowListViewSet(APIView):
    def get(self, request, user_id):
        # Lấy danh sách người theo dõi của người dùng có user_id
        followers = Follow.objects.filter(following=user_id)
        followers_serializer = FollowSerializer(followers, many=True)

        # Lấy danh sách người đang được theo dõi bởi người dùng có user_id
        following = Follow.objects.filter(follower=user_id)
        following_serializer = FollowSerializer(following, many=True)

        # Trả về cả danh sách người theo dõi và danh sách người đang được theo dõi trong một phản hồi
        return Response({
            'followers': followers_serializer.data,
            'following': following_serializer.data
        }, status=status.HTTP_200_OK)