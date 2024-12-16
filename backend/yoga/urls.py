from django.urls import path
from . import views


urlpatterns = [
    path('', views.FetchYogaPoseData.as_view(), name='all-yoga-poses'),
    path('<int:pk>/', views.YogaPoseDetailView.as_view(), name='yoga-detail'),
    path('pose_of_the_day/', views.YogaPoseOfTheDayView.as_view(), name='yoga-pose-of-the-day'),
    path('user/favorites/', views.UserFavoriteYogaPosesListView.as_view(), name='user-favorite-yoga-poses'),
    path('user/favorites/<int:pk>/', views.UserFavoriteYogaPosesDeleteView.as_view(), name='user-favorite-delete'),
]