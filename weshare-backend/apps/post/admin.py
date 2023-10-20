from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    # list_display = ('author', 'id',)
    ordering = ('-id',)

admin.site.register(Post, PostAdmin)