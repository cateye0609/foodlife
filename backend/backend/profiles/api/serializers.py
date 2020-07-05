from rest_framework import serializers
from ..models import Profile
from django.conf import settings


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')

    bio = serializers.CharField(allow_blank=True, required=False)
    birthday = serializers.CharField(allow_blank=True, required=False)
    # gender = serializers.CharField(source='get_gender_display')

    following = serializers.SerializerMethodField()
    avatar_uri = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["id", 'username', 'email', 'bio', 'birthday', 'gender', 'following', 'avatar', 'avatar_uri']
        read_only_fields = ['username', 'email']

    # def get_gender(self, obj):
    #     return obj.get_gender_display()

    def get_following(self, instance):
        request = self.context.get('request', None)

        if request is None:
            return False

        if not request.user.is_authenticated:
            return False

        follower = request.user.profile
        followee = instance

        return follower.is_following(followee)

    def get_avatar_uri(self, instance):
        avatar_uri = ''
        if instance.avatar:
            avatar_uri = settings.BASE_URL + instance.avatar
        return avatar_uri
