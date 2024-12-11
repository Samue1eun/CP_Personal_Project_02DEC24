from django.urls import path
from . import views
from .views import SyncCryptoDataView, RemoveFavoriteCryptoView, PostListCreateView, UserPostListView, PostDetailView, PostUdpateView

urlpatterns = [
    path('cryptos/', views.CryptoCurrencyListView.as_view(), name='crypto-list'),
    path('cryptos/<int:pk>/', views.CryptoCurrencyDetailView.as_view(), name='crypto-detail'),
    path('favorites/', views.UserFavoriteCryptoListView.as_view(), name='user-favorites'),
    path('favorites/add/', views.UserFavoritesCryptoCreateView.as_view(), name='add-favorite'),
    path('users/', views.UserListCreateView.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('api/favorites/add/', views.UserFavoritesCryptoCreateView.as_view(), name='add-favorite'),
    path('api/user/favorites/', views.UserFavoriteCryptoListView.as_view(), name='user-favorite-list'),
    path('api/favorites/remove/', RemoveFavoriteCryptoView.as_view(), name='remove-favorite'),
    path('api/posts/', PostListCreateView.as_view(), name='post-list-create,'),
    path('api/user/posts/', UserPostListView.as_view(), name='user-post-list'),
    path('api/posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('api/posts/update/<int:pk>/', PostUdpateView.as_view(), name='post-update'),
    path('api/sync-crypto/', SyncCryptoDataView.as_view(), name='sync-crypto'),
]