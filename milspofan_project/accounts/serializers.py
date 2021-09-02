from milspofan_app.models import Recommendation
from rest_framework import serializers
from .models import MemberProfile, MemberLocation, MemberSocialLink, MemberAnnouncement

class MemberLocationSerializer(serializers.ModelSerializer):
    # member = MemberProfile.objects.filter(member=self.kwargs['members_pk'])
    # member = serializers.StringRelatedField(read_only=True)
    # member = MemberProfile.objects.filter(id=3)
    class Meta:
        model = MemberLocation
        fields = ['member','location','show_pin','year_arrived','year_departed']
        # extra_kwargs = {
        #     'member':{'read_only': True}
        # }

        def create(self, validated_data):
            print("ENTER CREATE METHOD")
            this_member = MemberProfile.objects.filter(member=self.kwargs['members_pk'])
            location = MemberLocation.objects.create(**validated_data, member=this_member)
            print("MEMBER: ", this_member, " --- LOCATION: ", location.location, "--- Location-Member: ", location.member)
            return location

class MemberSocialLinkSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MemberSocialLink
        fields = ['member', 'social_link',]

class MemberAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberAnnouncement
        fields = ['member', 'body_text', 'date']

class MemberSerializer(serializers.ModelSerializer):
    locations = serializers.StringRelatedField(many=True,read_only=True)
    # locations = MemberLocationSerializer(many=True)

    social_links = serializers.StringRelatedField(many=True,read_only=True)
    
    announcements = serializers.StringRelatedField(many=True,read_only=True)

    recommendations = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta:
        model = MemberProfile
        fields = ['username', 'name_on_blog', 'email', 'artist_bio', 'website', 'image_url', 'hashtags', 'public_profile', 'locations', 'social_links', 'announcements', 'recommendations']

    # def create(self, validated_data):
    #     locations = validated_data.pop('locations')
    #     member = MemberProfile.objects.create(**validated_data)
    #     for location in locations:
    #         myplace = MemberLocation.objects.get(name=location["name"])
    #         member.locations.add(myplace)
    #     return member
        

    # def create(self, validated_data):
    #     print("CREATE MEMBER IS CALLED")
    #     locations = validated_data.pop('locations')
    #     member = MemberProfile.objects.create(**validated_data)
    #     for location in locations:
    #         print(location)
    #         mylocation = MemberLocation.objects.get(location=location["location"])
    #         member.locations.add(mylocation)
    #     return member



