from game_shop.test_base import AuthenticatedAPITestCase
from games.models import Game


# Create your tests here.
class TestCreateReview(AuthenticatedAPITestCase):
    test_data = {"content": 10 * "a"}

    def get_url(self):
        url = f"/api/games/{self.game.id}/reviews/"
        return url

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.game = Game.objects.create(
            name="test", name_original="test", slug="test", price=1
        )

    def test_no_user_returns_401(self):
        response = self.client.post(self.get_url(), self.test_data)
        self.assertEqual(
            response.status_code, 401, f"Invalid status code: {response.status_code}"
        )

    def test_create_twice_returns_400(self):
        self.authenticate()
        self.client.post(self.get_url(), self.test_data)
        response = self.client.post(self.get_url(), self.test_data)

        self.assertEqual(
            response.status_code, 400, f"Invalid status code: {response.status_code}"
        )

    def test_no_game_returns_404(self):
        self.authenticate()
        response = self.client.post(
            f"/api/games/{self.game.id + 1}/reviews/", self.test_data
        )

        self.assertEqual(
            response.status_code, 404, f"Invalid status code: {response.status_code}"
        )

    def test_empty_review_returns_400(self):
        self.authenticate()
        response = self.client.post(self.get_url(), {})

        self.assertEqual(
            response.status_code, 400, f"Invalid status code: {response.status_code}"
        )

    def test_create_review_returns_201(self):
        self.authenticate()
        response = self.client.post(self.get_url(), self.test_data)
        response_json = response.json()
        reviews = self.client.get(self.get_url()).json()

        self.assertEqual(
            response.status_code, 201, f"Invalid status code: {response.status_code}"
        )
        self.assertEqual(response_json["content"], 10 * "a", "Invalid response!")
        self.assertEqual(reviews["count"], 1, "Review was not created!")
