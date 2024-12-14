from django.shortcuts import render
from rest_framework import generics, permissions
from .models import YogaPose, UserFavoriteYogaPoses
from .serializers import YogaPoseSerializer, UserFavoriteYogaPosesSerializer, UserFavoriteYogaPosesCreateSerializer

# Create your views here.

class YogaPoseListCreateView(generics.ListCreateAPIView):
    queryset = YogaPose.objects.all()
    serializer_class = YogaPoseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class YogaPoseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = YogaPose.objects.all()
    serializer_class = YogaPoseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserFavoriteYogaPosesListView(generics.ListAPIView):
    serializer_class = UserFavoriteYogaPosesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserFavoriteYogaPoses.objects.filter(user=self.request.user)

class UserFavoriteYogaPosesCreateView(generics.CreateAPIView):
    serializer_class = UserFavoriteYogaPosesCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserFavoriteYogaPosesDeleteView(generics.DestroyAPIView):
    queryset = UserFavoriteYogaPoses.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserFavoriteYogaPoses.objects.filter(user=self.request.user)