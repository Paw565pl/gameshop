from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from games.models import Game


# Create your tests here.
class TestCreateReview(APITestCase):
    test_review = {"content": 10 * "a"}

    @classmethod
    def setUpTestData(cls):
        cls.game = Game.objects.create(
            id=1, name="test", name_original="test", slug="test", price=1
        )
        cls.user = get_user_model().objects.create(
            username="test1", password="test1", email="test1@test.com"
        )

    def authenticate(self):
        token = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {token.access_token}"  # noqa
        )

    def test_create_review_no_user_returns_401(self):
        response = self.client.post("/api/games/1/reviews/", self.test_review)
        assert response.status_code == 401

    def test_create_review_twice_returns_400(self):
        self.authenticate()
        self.client.post("/api/games/1/reviews/", self.test_review)
        response = self.client.post("/api/games/1/reviews/", self.test_review)

        assert response.status_code == 400

    def test_create_review_no_game_returns_404(self):
        self.authenticate()
        response = self.client.post("/api/games/2/reviews/", self.test_review)

        assert response.status_code == 404

    def test_create_review_returns_201(self):
        self.authenticate()
        response = self.client.post("/api/games/1/reviews/", self.test_review)
        response_json = response.json()

        assert response.status_code == 201
        assert response_json["content"] == 10 * "a"
