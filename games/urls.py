from rest_framework_nested import routers

from . import views

router = routers.DefaultRouter()

router.register(r"genres", views.GenreViewSet)
router.register(r"platforms", views.PlatformViewSet)
router.register(r"developers", views.DeveloperViewSet)
router.register(r"games", views.GameViewSet)
router.register(
    r"favourite-games", views.FavouriteGameViewSet, basename="favourite-games"
)

game_router = routers.NestedDefaultRouter(router, r"games", lookup="game")
game_router.register(
    r"screenshots", views.ScreenshotViewSet, basename="game-screenshots"
)
game_router.register(r"reviews", views.ReviewViewSet, basename="game-reviews")

urlpatterns = router.urls + game_router.urls
