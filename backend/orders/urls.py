from rest_framework_nested import routers

from . import views

router = routers.SimpleRouter()

router.register(r"carts", views.CartViewSet, basename="carts")
router.register(r"orders", views.OrderViewSet, basename="orders")
router.register(r"addresses", views.AddressViewSet, basename="addresses")
router.register(
    r"support-tickets", views.SupportTicketViewSet, basename="support-tickets"
)

cart_router = routers.NestedSimpleRouter(router, r"carts", lookup="cart")
cart_router.register(r"items", views.CartItemViewSet, basename="cart-items")

support_tickets_router = routers.NestedSimpleRouter(
    router, r"support-tickets", lookup="support_ticket"
)
support_tickets_router.register(
    r"messages", views.SupportTicketMessageViewSet, basename="support-ticket-messages"
)

urlpatterns = router.urls + cart_router.urls + support_tickets_router.urls
