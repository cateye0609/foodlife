from django.conf.urls import url, include

from . import views

app_name = 'authentication'

urlpatterns = [
    url(r'^user/?$', views.UserRetrieveUpdateAPIView.as_view()),
    url(r'^users/?$', views.RegistrationAPIView.as_view()),
    url(r'^users/login/?$', views.LoginAPIView.as_view()),
]
