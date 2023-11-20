from rest_framework import serializers
from .models import Stories

class StoriesSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    author_image = serializers.ReadOnlyField(source='author.image.url')
    author_id = serializers.ReadOnlyField(source='author.id')
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Stories
        fields = '__all__'
        
    def get_image(self, obj):
        return obj.image.url.replace('http://localhost:8000', '')
    
class StoriesCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stories
        fields = '__all__'