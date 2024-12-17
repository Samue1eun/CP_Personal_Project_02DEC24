from rest_framework import serializers
from .models import YogaPose, UserFavoriteYogaPoses

class YogaPoseSerializer(serializers.ModelSerializer):
    class Meta:
        model = YogaPose
        fields = '__all__'

class UserFavoriteYogaPosesCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavoriteYogaPoses
        fields = ['yoga_pose']

    def create(self, validated_data):
        user = self.context['request'].user
        yoga_pose = validated_data['yoga_pose']
        favorite, created = UserFavoriteYogaPoses.objects.get_or_create(user=user, yoga_pose=yoga_pose)
        return favorite

class UserFavoriteYogaPosesSerializer(serializers.ModelSerializer):
    yoga_pose = YogaPoseSerializer()

    class Meta:
        model = UserFavoriteYogaPoses
        fields = '__all__'