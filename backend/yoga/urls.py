from django.urls import path
from . import views

urlpatterns = [
    path('', views.YogaPoseListCreateView.as_view(), name='yoga-list-create'),
    path('<int:pk>/', views.YogaPoseDetailView.as_view(), name='yoga-detail'),
]