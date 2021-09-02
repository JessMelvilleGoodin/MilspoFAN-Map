from rest_framework import serializers
from .models import ArtisticDiscipline, Recommendation, RecComment, BlogPostInfo


class ArtisticDisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtisticDiscipline
        fields = ['name']

class RecCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecComment
        fields = ['recommendation', 'written_by' , 'body_text', 'date']

# class ADtoRecJoinSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ADtoRecJoin
#         fields = ['artistic_discipline']

class RecommendationSerializer(serializers.ModelSerializer):
    comments = RecCommentSerializer(many=True, read_only=True)
    # artistic_disciplines = ArtisticDisciplineSerializer(many=True, read_only=True)
    class Meta:
        model = Recommendation
        fields = ['name', 'description', 'artistic_disciplines', 'member_notes', 'hashtags', 'location_independent', 'location', 'website', 'recommended_by', 'rec_date', 'comments']
        extra_kwargs = {'artistic_disciplines': {'required': False}}
        

class BlogPostInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPostInfo
        fields = ['artist',  'link', 'title', 'location']

