from django.shortcuts import render
from .models import MemberProfile, MemberAnnouncement, MemberLocation,MemberSocialLink
from .serializers import MemberSerializer, MemberLocationSerializer, MemberSocialLinkSerializer, MemberAnnouncementSerializer
from rest_framework import viewsets

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


