from django.db import models
from accounts.models import MemberProfile
from django.utils.timezone import now

class RecArtisticDiscipline(models.Model):
    ARTS_DISC_CHOICES = [
        # First value shows up as KEY in form(for JS), second is human- readable
        ('Dance', 'Dance'),
        ('Theatre', 'Theatre'),
        ('Painting', 'Painting'),
        ('Nothing Selected', 'Nothing Selected')
    ]
    artistic_discipline = models.CharField(
        max_length=200,
        choices = ARTS_DISC_CHOICES,
    )

    def __str__(self):
        return f"{self.artistic_discipline}"

class Recommendation(models.Model):
    class Meta:
        verbose_name = "Recommendation"
        verbose_name_plural = "Recommendations"

    name = models.CharField(max_length=200, null=False)
    description = models.TextField(max_length=1000)
    member_notes = models.CharField(max_length=1000, blank=True)
    hashtags = models.CharField(max_length=1000, blank=True)
    location_independent = models.BooleanField(default=False)
    location = models.CharField(max_length=350)
    website = models.URLField(blank=True)
    recommended_by = models.ForeignKey(MemberProfile, on_delete=models.CASCADE, related_name='recommendations')
    rec_date = models.DateTimeField(default=now, editable=True)
    artistic_disciplines = models.ManyToManyField(RecArtisticDiscipline, related_name='recommendations', blank=True)
    # comments will come from related_name from RecComment implementation

    def __str__(self):
        return f"{self.name}, location: {self.location} date: {self.rec_date}"

class RecComment(models.Model):
    recommendation = models.ForeignKey(Recommendation, on_delete=models.CASCADE, related_name='comments')
    written_by = models.ForeignKey(MemberProfile, on_delete=models.CASCADE, related_name='comments_written')
    body_text = models.CharField(max_length=500)
    date = models.DateTimeField(default=now, editable=True)

    
class BlogPostInfo(models.Model):
    artist = models.ForeignKey(MemberProfile, on_delete=models.CASCADE, related_name='blog_posts')
    link = models.URLField()
    title = models.CharField(max_length=200)
    location = models.CharField