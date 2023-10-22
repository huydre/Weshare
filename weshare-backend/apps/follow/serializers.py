from rest_framework import serializers
from .models import Follow

class FollowSerializer(serializers.ModelSerializer):
    follower = serializers.ReadOnlyField(source='follower.username')
    following = serializers.ReadOnlyField(source='following.username')
    class Meta:
        model = Follow
        fields = '__all__'

class FollowCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'
