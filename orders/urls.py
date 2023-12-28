from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register(r"carts", views.CartViewSet)

cart_router = routers.NestedDefaultRouter(router, r"carts", lookup="cart")
cart_router.register(r"items", views.CartItemViewSet, basename="cart-items")

urlpatterns = router.urls + cart_router.urls
