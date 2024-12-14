from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class YogaPose(models.Model):
    english_name = models.CharField(max_length=100)
    sanskrit_name = models.CharField(max_length=100)
    translation_name = models.CharField(max_length=100)
    pose_description = models.TextField()
    pose_benefits = models.TextField()
    url_svg_alt = models.URLField()

    def __str__(self):
        return f"English Name: {self.english_name} Sanskrit Name: {self.sanskrit_name} Translation Name: {self.translation_name}"

class UserFavoriteYogaPoses(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorite_yoga_poses')
    yoga_pose = models.ForeignKey(YogaPose, on_delete=models.CASCADE, related_name='favorited_by_users')

    class Meta:
        unique_together = ('user', 'yoga_pose')

    def __str__(self):
        return f"User: {self.user.username} Favorite Yoga Pose: {self.yoga_pose.english_name}"

class YogaCategory(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
