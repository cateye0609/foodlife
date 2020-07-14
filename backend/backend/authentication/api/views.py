from rest_framework import status, generics, mixins
from rest_framework.generics import RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.conf import settings

from .renderers import UserJSONRenderer
from .serializers import (
    LoginSerializer, UserSerializer, RegistrationSerializer, ChangePasswordSerializer
)
from profiles.models import Profile
from ..models import User


class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer

    def post(self, request):
        user = {
            "email": request.data.get('email', {}),
            "username": request.data.get('username', {}),
            "password": request.data.get('password', {})
        }
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = {
            "email": request.data.get('email', {}),
            "password": request.data.get('password', {})
        }
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            Profile.objects.get(user__username=request.user.username)
        except Profile.DoesNotExist:
            Profile.objects.create(user_id=request.user.pk, birthday='1990-01-01')

        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        user_data = request.data.get('user', {})

        serializer_data = {
            'username': request.data.get('username', {}),
            'email': request.data.get('email', {}),

            'profile': {
                'image': request.data.get('image', {}),
                'bio': request.data.get('bio', {}),
                'birthday': request.data.get('birthday', {}),
                'gender': request.data.get('gender', {}),
                'avatar': request.data.get('avatar', {}),
            },
        }

        print(serializer_data)

        try:
            Profile.objects.get(user__username=request.user.username)
        except Profile.DoesNotExist:
            Profile.objects.create(user_id=request.user.pk, birthday='1990-01-01')

        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
            }

            return Response(response, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomPasswordResetView:
    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, reset_password_token, *args, **kwargs):
        msg = EmailMultiAlternatives(
            # title:
            "Password Reset for {}".format(reset_password_token.user.username),
            # message:
            "{}password-reset/{}".format(settings.WEB_URL, reset_password_token.key),
            # from:
            settings.EMAIL_HOST_USER,
            # to:
            [reset_password_token.user.email]
        )
        msg.send()