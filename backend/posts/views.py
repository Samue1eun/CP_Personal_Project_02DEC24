from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer

# CREATE, UPDATE, READ, DELETE for User Posts

class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserPostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_class = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user)

