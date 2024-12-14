from django.contrib.auth.models import User
from rest_framework import serializers
from .models import CryptoCurrency, UserFavoritesCrypto

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