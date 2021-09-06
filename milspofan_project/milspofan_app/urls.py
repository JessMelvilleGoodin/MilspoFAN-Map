from rest_framework_nested import routers
from .views import RecArtisticDisciplineViewSet, RecommendationViewSet, RecCommentViewSet, BlogPostInfo
from django.urls import path, include

router = routers.SimpleRouter()

router.register(r'artx-discx', RecArtisticDisciplineViewSet)

router.register(r'recs', RecommendationViewSet)

comment_router = routers.NestedSimpleRouter(
    router,
    r'recs', lookup='recs'
)

comment_router.register(
    r'comments',
    RecCommentViewSet,
)

app_name = 'milspofan_app'

urlpatterns = [ 
    path('', include(router.urls)),
    path('', include(comment_router.urls)),
    path('blog-posts/', BlogPostInfo.as_view(), name="blog-posts"),
]



# from django.urls import path, include
# from django.conf.urls import url
# from .views import RecArtisticDisciplineViewSet, RecommendationViewSet, RecCommentViewSet, BlogPostInfo
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'artx-discx', RecArtisticDisciplineViewSet, basename='Artistic Disciplines')

# router.register(r'recs', RecommendationViewSet, basename='Recommendations')

# # router.register(r'rec-comments', RecCommentViewSet, basename='Rec Comments')



# urlpatterns = [ 
#     # path('', views.dash, name='dash'),
#     path('', include(router.urls), name="crud-api-root"),
#     path('blog-posts/', BlogPostInfo.as_view(), name="blog-posts"),

#     url(r'^recs/(?P<recommendation_pk>\d+)/comments/?$', RecCommentViewSet.as_view({'get': 'list', 'put': 'update', 'post': 'create'}), name='blog-post-list')
# ]