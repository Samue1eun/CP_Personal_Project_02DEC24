from django.urls import path
from .views import (
    CryptoCurrencyListView, CryptoCurrencyDetailView, UserFavoriteCryptoListView, 
    UserFavoritesCryptoCreateView, RemoveFavoriteCryptoView
)

urlpatterns = [
    path('cryptos/', CryptoCurrencyListView.as_view(), name='crypto-list'),
    path('cryptos/<int:pk>/', CryptoCurrencyDetailView.as_view(), name='crypto-detail'),
    path('crypto/user_favorites/', UserFavoriteCryptoListView.as_view(), name='user-favorites'),
    path('crypto/user_favorites/add/', UserFavoritesCryptoCreateView.as_view(), name='user-add-favorite'),
    path('crypto/user_favorites/remove/', RemoveFavoriteCryptoView.as_view(), name='user-remove-favorite'),
]