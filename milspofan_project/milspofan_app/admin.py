from django.contrib import admin
from .models import ArtisticDiscipline, Recommendation, RecComment, BlogPostInfo

admin.site.register(ArtisticDiscipline)
admin.site.register(Recommendation)
admin.site.register(RecComment)
admin.site.register(BlogPostInfo)

