from django.urls import path
from django.shortcuts import render
from . import views
from .views import CryptoCurrencyListView, CryptoCurrencyDetailView, UserFavoriteCryptoListView, UserFavoritesCryptoCreateView, RemoveFavoriteCryptoView

# Create your views here.

urlpatterns = [
    path('cryptos/', views.CryptoCurrencyListView.as_view(), name='crypto-list'),
    path('cryptos/<int:pk>/', views.CryptoCurrencyDetailView.as_view(), name='crypto-detail'),
    path('crypto/user_favorites/', views.UserFavoriteCryptoListView.as_view(), name='user-favorites'),
    path('crypto/user_favorites/add/', views.UserFavoritesCryptoCreateView.as_view(), name='user-add-favorite'),
    path('crypto/user_favorites/remove/', views.RemoveFavoriteCryptoView.as_view(), name='user-remove-favorite'),
]