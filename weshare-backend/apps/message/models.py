from django.db import models
from django.contrib.auth import get_user_model
from apps.user.models import User
from rest_framework import serializers

class Message(models.Model):
    
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="from_user")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="to_user")
    body = models.TextField(blank=False, null=False)
    date = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ('date',)
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
        
    def __str__(self):
        return f"{self.sender.username} sent a message to {self.receiver.username}"