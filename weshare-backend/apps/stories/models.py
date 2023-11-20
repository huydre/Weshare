from django.db import models
from apps.user.models import User

def upload_to(instance, filename):
    return f"stories/{instance.id}/{filename}"

class Stories(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_to, blank=False, null=False)
    create_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.author.username} - {self.id}"
    
    class Meta:
        verbose_name = 'Stories'
        verbose_name_plural = 'Stories'