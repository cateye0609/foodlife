from rest_framework import serializers, status, generics, exceptions, filters
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..models import Profile
from .renderers import ProfileJSONRenderer
from .serializers import ProfileSerializer

from authentication.models import User


class ProfileRetrieveAPIView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Profile.objects.select_related('user')
    renderer_classes = (ProfileJSONRenderer,)
    serializer_class = ProfileSerializer

    def retrieve(self, request, username, *args, **kwargs):
        # Try to retrieve the requested profile and throw an exception if the
        # profile could not be found.
        try:
            profile = self.queryset.get(user__username=username)
        except Profile.DoesNotExist:
            user = User.objects.get(username=username)
            profile = Profile.objects.create(user_id=user.pk, birthday='1990-01-01')
        serializer = self.serializer_class(profile, context={
            'request': request
        })

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileListAPIView(generics.ListCreateAPIView):
    search_fields = ['user__username']
    filter_backends = (filters.SearchFilter,)
    permission_classes = (AllowAny,)
    queryset = Profile.objects.select_related('user')
    renderer_classes = (ProfileJSONRenderer,)
    serializer_class = ProfileSerializer
