from django.urls import path
from . import views

urlpatterns = [
    path('cryptos/', views.CryptoCurrencyListView.as_view(), name='crypto-list'),
    path('cryptos/<int:pk>/', views.CryptoCurrencyDetailView.as_view(), name='crypto-detail'),
    path('favorites/', views.UserFavoriteCryptoListView.as_view(), name='user-favorites'),
    path('favorites/add/', views.UserFavoritesCryptoCreateView.as_view(), name='add-favorite'),
    path('users/', views.UserListCreateView.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('api/favorites/add/', views.UserFavoritesCryptoCreateView.as_view(), name='add-favorite'),
    path('api/user/favorites/', views.UserFavoriteCryptoListView.as_view(), name='user-favorite-list'),
]