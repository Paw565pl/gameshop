from rest_framework import routers
from rest_framework_nested import routers as nested_routers
from . import views

router = routers.DefaultRouter()

router.register(r"games", views.GameViewSet)
game_router = nested_routers.NestedDefaultRouter(router, r"games", lookup="game")
game_router.register(r"reviews", views.ReviewViewSet, basename="game-reviews")

urlpatterns = router.urls + game_router.urls
