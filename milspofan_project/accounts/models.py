from django.db import models
from django.contrib.auth import models as auth_models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator


#--- Main custom User class 
class MemberProfile(AbstractUser):
    class Meta:
        verbose_name = "MilspoFANUser"
        verbose_name_plural = "MilspoFANUsers"

    name_on_blog = models.CharField(max_length=200, null=False)
    email = models.EmailField(max_length = 254)
    artist_bio = models.TextField(max_length=2000, null=True, blank=True)
    website = models.URLField(max_length=300, null=True, blank=True)
    image_url = models.URLField(max_length=300, null=True, blank=True)
    hashtags = models.TextField(max_length=2000, null=True, blank=True)
    # location (related_name of MemberLocation) FIELDS: member,location, year_arrived, year_departed
    # social_links (related_name of MemberSocialLink)FIELDS:  member, social_link
    # artistic_discipline (related_name of milspofan_app.ArtisticDiscipline) FIELDS: name, members


class MemberLocation(models.Model):
    # members can have multiple MemberLocations, MemberLocations have only one member
    member = models.ForeignKey(MemberProfile, on_delete=models.CASCADE, related_name='locations')
    location = models.CharField(max_length=200)
    year_arrived = models.IntegerField(
        default=1,
        validators=[
            MinValueValidator(1900),
            MaxValueValidator(3000)
        ]
    )
    year_departed= models.IntegerField(
        default=1,
        validators=[
            MinValueValidator(1900),
            MaxValueValidator(3000)
        ]
    )
    def __str__(self):
        return f"{self.username} at {self.location} arrived: {self.year_arrived}, departed: {self.year_departed}"

class MemberSocialLink(models.Model):
    # members can have multiple MemberLocations, MemberLocations have only one member
    member = models.ForeignKey(MemberProfile, on_delete=models.CASCADE, related_name='social_links')
    social_link = models.URLField(max_length=300)