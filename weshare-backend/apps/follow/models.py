from django.db import models
from apps.user.models import User


class Follow (models.Model):
    
    follower = models.ForeignKey(User, related_name='follower', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ['follower', 'following']

    def __str__(self):
        return f"{self.follower} follows {self.following}"
