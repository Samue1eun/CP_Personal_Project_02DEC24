from django.urls import path
from .views import FetchYogaPoseData, YogaPoseOfTheDayView, UserFavoriteYogaPosesListView, UserFavoriteYogaPosesCreateView, UserFavoriteYogaPosesDeleteView

urlpatterns = [
    path('', FetchYogaPoseData.as_view(), name='all-yoga-poses'),
    path('pose_of_the_day/', YogaPoseOfTheDayView.as_view(), name='yoga-pose-of-the-day'),
    path('user_favorites/', UserFavoriteYogaPosesListView.as_view(), name='user-favorite-yoga-poses'),
    path('user_favorites/add/', UserFavoriteYogaPosesCreateView.as_view(), name='user-favorite-add'),
    path('user_favorites/<int:pk>/remove/', UserFavoriteYogaPosesDeleteView.as_view(), name='user-favorite-delete'),
]