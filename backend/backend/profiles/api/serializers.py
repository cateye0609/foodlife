from rest_framework import serializers
from ..models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')

    bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.SerializerMethodField()
    birthday = serializers.CharField(allow_blank=True, required=False)
    gender = serializers.CharField(source='get_gender_display')

    class Meta:
        model = Profile
        fields = ["id", 'username', 'email', 'bio', 'image', 'birthday', 'gender', ]
        read_only_fields = ['username', 'email']

    def get_image(self, obj):
        if obj.image:
            return obj.image

        return 'https://static.productionready.io/images/smiley-cyrus.jpg'

    def get_gender(self, obj):
        return obj.get_gender_display()
