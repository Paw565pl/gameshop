from game_shop.test_base import AuthenticatedAPITestCase
from games.models import Game


class TestAddFavouriteGame(AuthenticatedAPITestCase):
    url = "/api/favourite-games/"
    test_data = {"game_id": 1}

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.game = Game.objects.create(
            id=1, name="test", name_original="test", slug="test", price=1
        )

    def test_no_game_returns_400(self):
        self.authenticate()
        response = self.client.post(self.url, {"game_id": 2})
        self.assertEqual(
            response.status_code, 400, f"Invalid status code: {response.status_code}"
        )

    def test_add_twice_returns_400(self):
        self.authenticate()
        self.client.post(self.url, self.test_data)
        response = self.client.post(self.url, self.test_data)
        self.assertEqual(
            response.status_code, 400, f"Invalid status code: {response.status_code}"
        )

    def test_add_favourite_game_returns_201(self):
        self.authenticate()
        response = self.client.post(self.url, self.test_data)
        response_json = response.json()

        self.assertEqual(
            response.status_code, 201, f"Invalid status code: {response.status_code}"
        )
        self.assertEqual(response_json["id"], self.game.id, "Invalid response!")
        self.assertEqual(response_json["name"], self.game.name, "Invalid response!")
