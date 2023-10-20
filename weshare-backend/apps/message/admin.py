from django.contrib import admin
from .models import Message

class MessageAdmin(admin.ModelAdmin):
    ordering = ('-id',)

admin.site.register(Message, MessageAdmin)