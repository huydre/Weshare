from django.contrib import admin
from .models import Stories

class StoriesAdmin(admin.ModelAdmin):
    ordering = ('-id',)

admin.site.register(Stories, StoriesAdmin)