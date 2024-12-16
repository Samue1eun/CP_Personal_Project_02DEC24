from django.urls import path
from . import views


urlpatterns = [
    path('', views.FetchYogaPoseData.as_view(), name='all-yoga-poses'),
    path('<int:pk>/', views.YogaPoseDetailView.as_view(), name='yoga-detail'),
]