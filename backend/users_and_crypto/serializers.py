from django.contrib.auth.models import User
from rest_framework import serializers
from .models import CryptoCurrency, UserFavoritesCrypto, Post, YogaPose, UserFavoriteYogaPoses

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['content']

class CryptoCurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoCurrency
        fields = '__all__'

class UserFavoritesCryptoSerializer(serializers.ModelSerializer):
    crypto = CryptoCurrencySerializer()

    class Meta:
        model = UserFavoritesCrypto
        fields = ['id', 'crypto']

class UserFavoritesCryptoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavoritesCrypto
        fields = ['crypto']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class YogaPoseSerializer(serializers.ModelSerializer):
    class Meta:
        model = YogaPose
        fields = '__all__'

class UserFavoriteYogaPosesSerializer(serializers.ModelSerializer):
    yoga_pose = YogaPoseSerializer()

    class Meta:
        model = UserFavoriteYogaPoses
        fields = ['id', 'yoga_pose']

class UserFavoriteYogaPosesCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavoriteYogaPoses
        fields = ['yoga_pose']
