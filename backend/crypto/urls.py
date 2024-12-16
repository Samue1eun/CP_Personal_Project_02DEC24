from django.urls import path
from .views import (
    CryptoCurrencyListView, CryptoCurrencyDetailView, UserFavoriteCryptoListView, 
    UserFavoritesCryptoCreateView, RemoveFavoriteCryptoView
)

urlpatterns = [
    path('', CryptoCurrencyListView.as_view(), name='crypto-list'),
    path('<int:pk>/', CryptoCurrencyDetailView.as_view(), name='crypto-detail'),
    path('user_favorites/', UserFavoriteCryptoListView.as_view(), name='user-favorites'),
    path('user_favorites/add/', UserFavoritesCryptoCreateView.as_view(), name='user-add-favorite'),
    path('user_favorites/remove/', RemoveFavoriteCryptoView.as_view(), name='user-remove-favorite'),
]