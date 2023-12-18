from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register(r"games", views.GameViewSet)

game_router = routers.NestedDefaultRouter(router, r"games", lookup="game")
game_router.register(r"reviews", views.ReviewViewSet, basename="game-reviews")
game_router.register(
    r"screenshots", views.ScreenshotViewSet, basename="game-screenshots"
)

urlpatterns = router.urls + game_router.urls
