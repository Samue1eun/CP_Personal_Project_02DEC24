from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.models import User
from .models import CryptoCurrency, UserFavoritesCrypto
from .serializers import CryptoCurrencySerializer, UserFavoritesCryptoSerializer, UserFavoritesCryptoCreateSerializer, UserSerializer
from .utils import sync_crypto_data

#CREATE, UPDATE, READ, DELETE for CryptoCurrency

class CryptoCurrencyListView(generics.ListCreateAPIView):
    queryset = CryptoCurrency.objects.all()
    serializer_class = CryptoCurrencySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CryptoCurrencyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CryptoCurrency.objects.all()
    serializer_class = CryptoCurrencySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#Favorite Cryptos for User

class UserFavoriteCryptoListView(generics.ListAPIView):
    serializer_class = UserFavoritesCryptoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserFavoritesCrypto.objects.filter(user=self.request.user)

class UserFavoritesCryptoCreateView(generics.CreateAPIView):
    serializer_class = UserFavoritesCryptoCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RemoveFavoriteCryptoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, crypto_id):
        user = request.user
        try:
            favorite = UserFavoritesCrypto.objects.get(user=user, crypto_id=crypto_id)
            favorite.delete()
            return Response({"status": "success", "message": "Favorite removed successfully!"})
        except UserFavoritesCrypto.DoesNotExist:
            return Response({"status": "error", "message": "Favorite does not exist!"})

# CREATE, UPDATE, READ, DELETE for User

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Create User View for Registration

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

# Sync Crypto Data
class SyncCryptoDataView(APIView):
    permission_classes = [IsAdminUser]
    
    def post(self, request, *args, **kwargs):
        sync_crypto_data()
        return Response({"message": "Data synced successfully!"})