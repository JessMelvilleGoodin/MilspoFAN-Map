from django.contrib import admin
from .models import ArtisticDisciplines, Recommendation, RecComment, Announcement, BlogPostInfo

admin.site.register(ArtisticDisciplines)
admin.site.register(Recommendation)
admin.site.register(RecComment)
admin.site.register(Announcement)
admin.site.register(BlogPostInfo)

