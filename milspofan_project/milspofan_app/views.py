from django.db.models import query
from django.shortcuts import render
from .models import ArtisticDiscipline, Recommendation, RecComment, BlogPostInfo
from .serializers import ArtisticDisciplineSerializer, RecommendationSerializer, RecCommentSerializer, BlogPostInfoSerializer
from rest_framework import generics
from rest_framework import viewsets

class ArtisticDisciplineViewSet(viewsets.ModelViewSet):
    # CRUD shoudl be RESTRICTED TO AUTHORIZED USERS (at least initially)
    queryset = ArtisticDiscipline.objects.all()
    serializer_class = ArtisticDisciplineSerializer

class RecommendationViewSet(viewsets.ModelViewSet):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer

class RecCommentViewSet(viewsets.ModelViewSet):
    queryset = RecComment.objects.all().select_related('recommendation')
    serializer_class = RecCommentSerializer

    def get_queryset(self, *args, **kwargs):
        return RecComment.objects.filter(recommendation=self.kwargs['recs_pk'])

class BlogPostInfo(generics.ListAPIView):
# """Don't need to be able to CREATE a blogpostinfo item, that would violate single source of truth. The API will be populated from a call to the WordPress Rest API"""
    queryset = BlogPostInfo.objects.all()
    serializer_class = BlogPostInfoSerializer