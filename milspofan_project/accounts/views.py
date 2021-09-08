from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .models import MemberArtisticDiscipline, MemberProfile, MemberAnnouncement, MemberLocation,MemberSocialLink
from .serializers import MemberSerializer, MemberLocationSerializer, MemberSocialLinkSerializer, MemberAnnouncementSerializer, SignupSerializer
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.contrib.auth.views import LoginView    


class MemberViewSet(viewsets.ModelViewSet):
    queryset = MemberProfile.objects.all()
    serializer_class = MemberSerializer

class MemberLocationViewSet(viewsets.ModelViewSet):
    queryset = MemberLocation.objects.all()
    serializer_class = MemberLocationSerializer

    def get_queryset(self, *args, **kwargs):
        return MemberLocation.objects.filter(member=self.kwargs['members_pk'])

class MemberSocialLinkViewSet(viewsets.ModelViewSet):
    queryset = MemberSocialLink.objects.all()
    serializer_class = MemberSocialLinkSerializer

    def get_queryset(self, *args, **kwargs):
        return MemberSocialLink.objects.filter(member=self.kwargs['members_pk'])

class MemberAnnouncementViewSet(viewsets.ModelViewSet):
    queryset = MemberAnnouncement.objects.all()
    serializer_class = MemberAnnouncementSerializer

    def get_queryset(self, *args, **kwargs):
        return MemberAnnouncement.objects.filter(member=self.kwargs['members_pk'])

class SignupView(CreateAPIView):
    queryset = MemberProfile.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        print("PERFORM CREATE STARTS")
        if serializer.is_valid():
            print(serializer.validated_data)
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            name_on_blog = serializer.validated_data["name_on_blog"]
            email = serializer.validated_data["email"]
            if serializer.validated_data.get("artist_bio"):
                artist_bio = serializer.validated_data.get("artist_bio")
            else:
                artist_bio = None
            if serializer.validated_data.get("artistic_disciplines"):
                artistic_disciplines = serializer.validated_data.get("artistic_disciplines")
            else:
                artistic_disciplines = []
            if serializer.validated_data.get("website"):
                website = serializer.validated_data.get("website")
            else:
                website = None
            if serializer.validated_data.get("image_url"):
                image_url = serializer.validated_data.get("image_url")
            else:
                image_url = None
            if serializer.validated_data.get("hashtags"):
                hashtags = serializer.validated_data.get("hashtags")
            else:
                hashtags = None
            if serializer.validated_data.get("public_profile"):
                public_profile = serializer.validated_data.get("public_profile")
            else:
                public_profile = None
            if serializer.validated_data.get("artistic_disciplines"):
                artistic_disciplines = serializer.validated_data.get("artistic_disciplines")
            else:
                artistic_disciplines= None

            new_user = MemberProfile.objects.create_user(username=username, password=password,name_on_blog=name_on_blog, email = email,
            artist_bio = artist_bio, website = website, image_url = image_url, hashtags = hashtags, public_profile = public_profile
            )

            if artistic_disciplines:
                print("INSIDE IF > ARTISTIC-DISCS", artistic_disciplines)
                new_user.artistic_disciplines.set(artistic_disciplines)
            # else:
            #     new_user.artistic_disciplines.set([1, 2])

            print("END OF SIGN UP VIEW", new_user)


class MemberLoginView(LoginView):
    template_name = 'login.html'
    permission_classes = [AllowAny]
    pass
    # userdata = request.userdata