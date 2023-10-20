from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):

    sender=serializers.ReadOnlyField(source='sender.username')
    # sender_id = serializers.ReadOnlyField(source='sender.id')
    
    receiver=serializers.ReadOnlyField(source='receiver.username')
    # receiver_id = serializers.ReadOnlyField(source='receiver.id')

    class Meta:
        model = Message
        fields = '__all__'
        
class MessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'