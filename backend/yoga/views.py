from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import YogaPose, UserFavoriteYogaPoses
from .serializers import YogaPoseSerializer, UserFavoriteYogaPosesSerializer, UserFavoriteYogaPosesCreateSerializer
import requests
# Fetch Yoga Pose Data from URL

class FetchYogaPoseData(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        url = 'https://yoga-api-nzy4.onrender.com/v1/poses'
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return Response(data)
        else:
            return Response({'error': "Failed to fetch data from the external API"}, status=response.status_code)

# Yoga Pose details

class YogaPoseListCreateView(generics.ListCreateAPIView):
    queryset = YogaPose.objects.all()
    serializer_class = YogaPoseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class YogaPoseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = YogaPose.objects.all()
    serializer_class = YogaPoseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# User Favorite Yoga Poses

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