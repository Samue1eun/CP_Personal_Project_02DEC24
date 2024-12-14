from django.urls import path
from . import views
from .views import PostListCreateView, UserPostListView, PostDetailView

urlpatterns = [
    path('api/v1/posts/', PostListCreateView.as_view(), name='post-list-create,'),
    path('api/v1/posts/user/', UserPostListView.as_view(), name='user-post-list'),
    path('api/v1/posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
]