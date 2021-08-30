from django.db import models
from accounts.models import MemberProfile

class ArtisticDisciplines(models.Model):
    name = models.CharField(max_length=200)
    members = models.ManyToManyField(MemberProfile, related_name='artistic_disciplines')
    

class Recommendation(models.Model):
    name = models.CharField(max_length=200, null=False)
    description = models.TextField(max_length=1000)
    member_notes = models.CharField(max_length=1000)
    hashtags = models.CharField(max_length=1000)
    location_independent = models.BooleanField(default=False)
    location = models.CharField(max_length=350)
    website = models.URLField()
    recommended_by = models.ForeignKey(MemberProfile, on_delete=models.CASCADE, related_name='recommendations')
    # comments will come from related_name from RecComment implementation

class RecComment(models.Model):
    written_by = models.ForeignKey(MemberProfile, on_delete=models.CASCADE, related_name='comments_written')
    body_text = models.CharField(max_length=500)

class Announcement(models.Model):
    recommended_by = models.OneToOneField(MemberProfile, on_delete=models.CASCADE)
    body_text = models.CharField(max_length=500)

class BlogPostInfo(models.Model):
    artist = models.ForeignKey(MemberProfile, on_delete=models.CASCADE, related_name='blog_posts')
    link = models.URLField()
    title = models.CharField(max_length=200)
    location = models.CharField