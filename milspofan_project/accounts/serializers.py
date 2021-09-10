from milspofan_app.models import Recommendation
from rest_framework import serializers
from .models import MemberProfile, MemberLocation, MemberSocialLink, MemberAnnouncement, MemberArtisticDiscipline


class MemberArtisticDisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberArtisticDiscipline
        fields = ['pk', 'id','artistic_discipline']
    

class MemberLocationSerializer(serializers.ModelSerializer):
    member = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = MemberLocation
        fields = ['pk', 'id', 'member','location','show_pin','year_arrived','year_departed']
        # extra_kwargs = {
        #     'member':{'read_only': True}
        # }

    def create(self, validated_data):
        this_member = self.context["request"].user
        location = MemberLocation.objects.create(**validated_data, member=this_member)
        return location
    
    

class MemberSocialLinkSerializer(serializers.ModelSerializer):
    member = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = MemberSocialLink
        fields = ['pk', 'id', 'member', 'social_link',]
    
    def create(self, validated_data):
        this_member = self.context["request"].user
        soc_link = MemberSocialLink.objects.create(**validated_data, member=this_member)
        return soc_link

class MemberAnnouncementSerializer(serializers.ModelSerializer):
    member = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = MemberAnnouncement
        fields = ['pk', 'id', 'member', 'body_text', 'date']
    
    def create(self, validated_data):
        this_member = self.context["request"].user
        announcement = MemberAnnouncement.objects.create(**validated_data, member=this_member)
        return announcement

class MemberSerializer(serializers.ModelSerializer):
    locations = serializers.StringRelatedField(many=True,read_only=True)
    # locations = MemberLocationSerializer(many=True)

    social_links = serializers.StringRelatedField(many=True,read_only=True)
    
    announcements = serializers.StringRelatedField(many=True,read_only=True)

    recommendations = serializers.StringRelatedField(many=True, read_only=True)
    
    artistic_disciplines = MemberArtisticDisciplineSerializer(many=True, required=False
    , read_only = True
    )
    # def update(self, instance, validated_data):
    #     this_member = self.context["request"].user
    #     instance.artistic_disciplines = MemberArtisticDiscipline.objects.create(**validated_data, member=this_member)
    #     return artistic_discipline


    class Meta:
        model = MemberProfile
        fields = ['pk', 'id', 'username', 'name_on_blog', 'email', 'artist_bio', 'website', 'image_url', 'hashtags', 'public_profile', 'locations', 'social_links', 'announcements', 'recommendations'
        , 'artistic_disciplines'
        ]

class SignupSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        print("VALIDATED DATA: ", validated_data)
        super().create(**validated_data)

    artistic_disciplines = MemberArtisticDisciplineSerializer(many=True, required=False)

    class Meta:
        model = MemberProfile
        fields = ["username", "password", "name_on_blog", "email", "artist_bio", "website", "image_url", "hashtags", "public_profile", "artistic_disciplines"]
