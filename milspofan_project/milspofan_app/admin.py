from django.contrib import admin
from .models import RecArtisticDiscipline, Recommendation, RecComment, BlogPostInfo

admin.site.register(RecArtisticDiscipline)
admin.site.register(Recommendation)
admin.site.register(RecComment)
admin.site.register(BlogPostInfo)

