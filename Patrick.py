# ----views.py
from .models import Portfolio, Trade
from rest_framework.viewsets import ModelViewSet
from .serializers import PortfolioSerializer, TradeSerializer

class PortfolioViewSet(ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    
class TradeViewSet(ModelViewSet):
    # queryset = Trade.objects.all()
    serializer_class = TradeSerializer

    # def queryset with the portfolio ID
    def get_queryset(self):
        return Trade.objects.filter(portfolio=self.kwargs['portfolio_pk'])



# ------ urls.py --------------------------------

from rest_framework_nested import routers
from .views import PortfolioViewSet, TradeViewSet
from django.urls import path, include

router = routers.SimpleRouter()
router.register('portfolios', PortfolioViewSet)

trade_router = routers.NestedSimpleRouter(
    router, 
    r'portfolios', lookup='portfolio'
)

trade_router.register(
    r'trades',
    TradeViewSet,
    basename='portfolio-trade'
)


app_name = 'portfolios'

urlpatterns = [
    path('', include(router.urls)),
    path('', include(trade_router.urls)),
]