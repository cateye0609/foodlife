from rest_framework import serializers
from ..models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')

    bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.SerializerMethodField()
    birthday = serializers.CharField(allow_blank=True, required=False)
    gender = serializers.CharField(source='get_gender_display')

    following = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["id", 'username', 'email', 'bio', 'image', 'birthday', 'gender', 'following']
        read_only_fields = ['username', 'email']

    def get_image(self, obj):
        if obj.image:
            return obj.image

        return 'https://static.productionready.io/images/smiley-cyrus.jpg'

    def get_gender(self, obj):
        return obj.get_gender_display()

    def get_following(self, instance):
        request = self.context.get('request', None)

        if request is None:
            return False

        if not request.user.is_authenticated:
            return False

        follower = request.user.profile
        followee = instance

        return follower.is_following(followee)
