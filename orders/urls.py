from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register(r"carts", views.CartViewSet, basename="carts")
router.register(r"orders", views.OrderViewSet, basename="orders")
router.register(r"addresses", views.AddressViewSet, basename="addresses")
router.register(
    r"support-tickets", views.SupportTicketViewSet, basename="support-tickets"
)

cart_router = routers.NestedDefaultRouter(router, r"carts", lookup="cart")
cart_router.register(r"items", views.CartItemViewSet, basename="cart-items")

urlpatterns = router.urls + cart_router.urls
