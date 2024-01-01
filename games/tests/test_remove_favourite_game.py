from game_shop.test_base import AuthenticatedAPITestCase
from games.models import Game


class TestRemoveFavouriteGame(AuthenticatedAPITestCase):
    def get_url(self):
        url = f"/api/favourite-games/{self.game.id}/"
        return url

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.game = Game.objects.create(
            name="test", name_original="test", slug="test", price=1
        )

    def setUp(self):
        self.authenticate()
        self.client.post("/api/favourite-games/", {"game_id": self.game.id})

    def test_no_favourite_game_returns_404(self):
        response = self.client.delete(f"/api/favourite-games/{self.game.id + 1}/")
        self.assertEqual(
            response.status_code, 404, f"Invalid status code: {response.status_code}"
        )

    def test_delete_favourite_game_returns_204(self):
        response = self.client.delete(self.get_url())
        games = self.client.get("/api/games/").json()

        self.assertEqual(
            response.status_code, 204, f"Invalid status code: {response.status_code}"
        )
        self.assertEqual(games["count"], 1, "Game object was deleted!")
        self.assertEqual(
            games["results"][0]["id"], self.game.id, "Game object was deleted!"
        )
