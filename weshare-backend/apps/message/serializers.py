from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):

    sender=serializers.ReadOnlyField(source='sender.username')
    receiver=serializers.ReadOnlyField(source='receiver.username')

    class Meta:
        model = Message
        fields = '__all__'
        
class MessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'