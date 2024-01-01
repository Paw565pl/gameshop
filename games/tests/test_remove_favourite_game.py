from game_shop.test_base import AuthenticatedAPITestCase
from games.models import Game


class TestRemoveFavouriteGame(AuthenticatedAPITestCase):
    url = "/api/favourite-games/1/"

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.game = Game.objects.create(
            id=1, name="test", name_original="test", slug="test", price=1
        )

    def setUp(self):
        self.authenticate()
        self.client.post("/api/favourite-games/", {"game_id": 1})

    def test_no_favourite_game_returns_404(self):
        response = self.client.delete("/api/favourite-games/2/")
        self.assertEqual(
            response.status_code, 404, f"Invalid status code: {response.status_code}"
        )

    def test_delete_favourite_game_returns_204(self):
        response = self.client.delete(self.url)
        games = self.client.get("/api/games/").json()

        self.assertEqual(
            response.status_code, 204, f"Invalid status code: {response.status_code}"
        )
        self.assertEqual(games["count"], 1, "Game object was deleted!")
        self.assertEqual(games["results"][0]["id"], 1, "Game object was deleted!")
