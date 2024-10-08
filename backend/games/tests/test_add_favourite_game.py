from game_shop.test_base import AuthenticatedAPITestCase
from games.models import Game


class TestAddFavouriteGame(AuthenticatedAPITestCase):
    url = "/api/favourite-games/"

    def get_test_data(self):
        test_data = {"game_id": self.game.id}
        return test_data

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.game = Game.objects.create(
            name="test", name_original="test", slug="test", price=1
        )

    def test_no_user_returns_401(self):
        response = self.client.post(self.url, self.get_test_data())
        self.assertEqual(
            response.status_code, 401, f"Invalid status code: {response.status_code}"
        )

    def test_no_game_returns_400(self):
        self.authenticate()
        response = self.client.post(self.url, {"game_id": self.game.id + 1})
        self.assertEqual(
            response.status_code, 400, f"Invalid status code: {response.status_code}"
        )

    def test_add_twice_returns_400(self):
        self.authenticate()
        self.client.post(self.url, self.get_test_data())
        response = self.client.post(self.url, self.get_test_data())
        self.assertEqual(
            response.status_code, 400, f"Invalid status code: {response.status_code}"
        )

    def test_add_favourite_game_returns_201(self):
        self.authenticate()
        response = self.client.post(self.url, self.get_test_data())
        favourite_games = self.client.get(self.url).json()

        self.assertEqual(
            response.status_code, 201, f"Invalid status code: {response.status_code}"
        )
        self.assertEqual(favourite_games["count"], 1, "Game was not added!")
        self.assertEqual(
            favourite_games["results"][0]["id"], self.game.id, "Game was not added!"
        )
