from django.contrib.auth import authenticate

from rest_framework import serializers
from profiles.api.serializers import ProfileSerializer

from ..models import User

from profiles.models import Profile


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'token']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(
            user_id=user.pk,
            birthday='1990-1-1'
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):

        email = data.get('email', None)
        password = data.get('password', None)
        if email is None:
            raise serializers.ValidationError(
                'An email address is required to log in.'
            )

        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found.'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )
        try:
            Profile.objects.get(user__username=user.username)
        except Profile.DoesNotExist:
            Profile.objects.create(user_id=user.pk, birthday='1990-01-01')


        return {
            'email': user.email,
            'username': user.username,
            'token': user.token
        }


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    profile = ProfileSerializer(write_only=True)

    bio = serializers.CharField(source='profile.bio', read_only=True)
    image = serializers.CharField(source='profile.image', read_only=True)
    birthday = serializers.CharField(source='profile.birthday', read_only=True)
    gender = serializers.CharField(source="profile.gender", read_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'token', 'profile', 'bio',
                  'image', 'birthday', 'gender']

        read_only_fields = ('token',)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        profile_data = validated_data.pop('profile', {})
        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)

        instance.save()

        for (key, value) in profile_data.items():

            if key == 'get_gender_display':
                setattr(instance.profile, 'gender', value)
            else:
                setattr(instance.profile, key, value)

        instance.profile.save()

        return instance
