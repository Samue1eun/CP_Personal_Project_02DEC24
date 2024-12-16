from django.urls import path
from . import views
from .views import PostListCreateView, UserPostListView, PostDetailView

urlpatterns = [
    path('', PostListCreateView.as_view(), name='post-list-create,'),
    path('user/', UserPostListView.as_view(), name='user-post-list'),
    path('<int:pk>/', PostDetailView.as_view(), name='post-detail'),
]