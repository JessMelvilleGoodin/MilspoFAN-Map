from accounts.serializers import MemberSerializer
from rest_framework import serializers
from .models import RecArtisticDiscipline, Recommendation, RecComment, BlogPostInfo


class RecArtisticDisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecArtisticDiscipline
        fields = ['pk', 'id', 'artistic_discipline']

class RecCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecComment
        fields = ['pk', 'id', 'recommendation', 'written_by' , 'body_text', 'date']


class RecommendationSerializer(serializers.ModelSerializer):
    comments = RecCommentSerializer(many=True, read_only=True)
    artistic_disciplines = RecArtisticDisciplineSerializer(many=True)
    recommended_by = MemberSerializer(read_only=True)
    class Meta:
        model = Recommendation
        fields = ['pk', 'id', 'name', 'description', 'artistic_disciplines', 'member_notes', 'hashtags', 'location_independent', 'location', 'website', 'recommended_by', 'rec_date', 'comments']
        extra_kwargs = {'artistic_disciplines': {'required': False}}

    def create(self, validated_data):
        this_member = self.context["request"].user
        rec = Recommendation.objects.create(**validated_data, recommended_by=this_member)
        return rec
        

class BlogPostInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPostInfo
        fields = ['pk', 'id', 'artist',  'link', 'title', 'location']

