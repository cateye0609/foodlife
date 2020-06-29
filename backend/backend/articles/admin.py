from django.contrib import admin

# Register your models here.
from .models import Tag, Article, Comment

admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(Tag)
