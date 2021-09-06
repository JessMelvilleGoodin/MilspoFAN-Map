from rest_framework_nested import routers
from django.conf.urls import url,include
from .views import BlogViewSet, PostViewSet, CommentViewSet

router = routers.SimpleRouter()
router.register(r'blogs', BlogViewSet)
#router.register(r'posts', PostViewSet)
#router.register(r'comments', CommentViewSet)
#urlpatterns = router.urls

# blogs_router = routers.NestedSimpleRouter(router, r'blogs', lookup='blog')
# blogs_router.register(r'posts', PostViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    # Get list of posts in a blog
    url(r'^blogs/(?P<blog_pk>\d+)/posts/?$', PostViewSet.as_view({'get': 'list','post': 'create'}), name='blog-post-list'),
    
    # Get details of a post in a blog
    url(r'^blogs/(?P<blog_pk>\d+)/posts/(?P<pk>\d+)/?$', PostViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='blog-post-detail')
    #url(r'^', include(blogs_router.urls)),
]



# ----------------------
class BlogViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing blogs.
    """
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class PostViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing posts.
    """
    queryset = Post.objects.all().select_related('blog').prefetch_related('comments')
        #http_method_names = ['get', 'post', 'patch', 'delete']
        serializer_class = PostSerializer

        def get_queryset(self, *args, **kwargs):
            blog_id = self.kwargs.get("blog_pk")
            try: 
                blog = Blog.objects.get(id=blog_id)
            except Blog.DoesNotExist:
                raise NotFound('A blog with this id does not exist')
            return self.queryset.filter(blog=blog)
