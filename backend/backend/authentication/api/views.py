from rest_framework import status, generics, mixins
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .renderers import UserJSONRenderer
from .serializers import (
    LoginSerializer, UserSerializer, RegistrationSerializer
)
from profiles.models import Profile


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
