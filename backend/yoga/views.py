from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import random
from datetime import datetime, timedelta
import pytz
from django.core.cache import cache
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

# Pose of the Day
class YogaPoseOfTheDayView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Check if the yoga pose of the day is already cached
        yoga_pose = cache.get('yoga_pose_of_the_day')
        if not yoga_pose:
            # If not cached, fetch data from the external API
            url = 'https://yoga-api-nzy4.onrender.com/v1/poses'
            response = requests.get(url)
            if response.status_code == 200:
                yoga_poses = response.json()
                if yoga_poses:
                    yoga_pose = random.choice(yoga_poses)
                    now = datetime.now(pytz.timezone('US/Pacific'))
                    midnight = (now + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)
                    seconds_until_midnight = (midnight - now).total_seconds()
                    cache.set('yoga_pose_of_the_day', yoga_pose, timeout=seconds_until_midnight)
                else:
                    return Response({'error': 'No poses available'}, status=404)
            else:
                return Response({'error': "Failed to fetch data from the external API"}, status=response.status_code)

        return Response(yoga_pose)
    
# User Favorite Yoga Poses

class UserFavoriteYogaPosesListView(generics.ListAPIView):
    serializer_class = UserFavoriteYogaPosesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserFavoriteYogaPoses.objects.filter(user=self.request.user)


class UserFavoriteYogaPosesCreateView(generics.ListCreateAPIView):
    serializer_class = UserFavoriteYogaPosesCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        print("Request data:", self.request.data)  # Add logging
        serializer.save(user=self.request.user)

class UserFavoriteYogaPosesDeleteView(generics.DestroyAPIView):
    queryset = UserFavoriteYogaPoses.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserFavoriteYogaPoses.objects.filter(user=self.request.user)