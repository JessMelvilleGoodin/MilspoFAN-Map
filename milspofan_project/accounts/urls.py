from rest_framework_nested import routers
from .views import MemberViewSet, MemberLocationViewSet, MemberSocialLinkViewSet, MemberAnnouncementViewSet
from django.urls import path, include

router = routers.SimpleRouter()

router.register(r'members', MemberViewSet)

member_info_router = routers.NestedSimpleRouter(
    router, 
    r'members', 
    lookup='members')

member_info_router.register(
    r'locations',
    MemberLocationViewSet,
    )

member_info_router.register(
    r'social_links',
    MemberSocialLinkViewSet,
    )


member_info_router.register(
    r'announcements',
    MemberAnnouncementViewSet,
    )

app_name = 'accounts'

urlpatterns = [ 
    path('', include(router.urls)),
    path('', include(member_info_router.urls)),
]
