from django.contrib.auth.models import User
from rest_framework import serializers
from .models import YogaPose, UserFavoriteYogaPoses

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
