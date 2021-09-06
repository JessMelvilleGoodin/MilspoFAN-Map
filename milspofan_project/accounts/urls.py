from rest_framework_nested import routers
from rest_framework.authtoken.views import obtain_auth_token
from .views import MemberViewSet, MemberLocationViewSet, MemberSocialLinkViewSet, MemberAnnouncementViewSet, SignupView, MemberLoginView
from django.urls import path, include
from rest_framework.authtoken import views

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
    path('get-token', obtain_auth_token),
    path('signup/', SignupView.as_view()),

    # path('auth/', include('django.contrib.auth.urls')),
            # INCLUDED:
            # auth/login/ [name='login']
            # auth/logout/ [name='logout']
            # auth/password_change/ [name='password_change']
            # auth/password_change/done/ [name='password_change_done']
            # auth/password_reset/ [name='password_reset']
            # auth/password_reset/done/ [name='password_reset_done']
            # auth/reset/<uidb64>/<token>/ [name='password_reset_confirm']
            # auth/reset/done/ [name='password_reset_complete']
    # path('auth/login/', MemberLoginView.as_view(), name='login'),
]
