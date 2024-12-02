from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import CryptoCurrency, UserFavoritesCrypto
from .serializers import CryptoCurrencySerializer, UserFavoritesCryptoSerializer, UserFavoritesCryptoCreateSerializer, UserSerializer

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