from django.conf.urls import url, include
from . import views

app_name = 'profiles'

urlpatterns = [
    url(r'^profiles/(?P<username>\w+)/?$', views.ProfileRetrieveAPIView.as_view()),
    url(r'^profiles/(?P<username>\w+)/follow/?$',
        views.ProfileFollowAPIView.as_view()),
    url(r'^profiles', views.ProfileListAPIView.as_view()),
]
