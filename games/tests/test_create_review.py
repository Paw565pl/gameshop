from game_shop.test_base import AuthenticatedAPITestCase
from games.models import Game


# Create your tests here.
class TestCreateReview(AuthenticatedAPITestCase):
    url = "/api/games/1/reviews/"
    test_review = {"content": 10 * "a"}

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.game = Game.objects.create(
            id=1, name="test", name_original="test", slug="test", price=1
        )

    def test_no_user_returns_401(self):
        response = self.client.post(self.url, self.test_review)
        self.assertEqual(
            response.status_code, 401, f"Invalid status code: {response.status_code}"
        )

    def test_create_twice_returns_400(self):
        self.authenticate()
        self.client.post(self.url, self.test_review)
        response = self.client.post(self.url, self.test_review)

        self.assertEqual(
            response.status_code, 400, f"Invalid status code: {response.status_code}"
        )

    def test_no_game_returns_404(self):
        self.authenticate()
        response = self.client.post("/api/games/2/reviews/", self.test_review)

        self.assertEqual(
            response.status_code, 404, f"Invalid status code: {response.status_code}"
        )

    def test_empty_review_returns_400(self):
        self.authenticate()

        response = self.client.post(self.url, {})
        self.assertEqual(
            response.status_code, 400, f"Invalid status code: {response.status_code}"
        )

    def test_create_review_returns_201(self):
        self.authenticate()
        response = self.client.post(self.url, self.test_review)
        response_json = response.json()

        self.assertEqual(
            response.status_code, 201, f"Invalid status code: {response.status_code}"
        )
        self.assertEqual(response_json["content"], 10 * "a", "Invalid response!")
