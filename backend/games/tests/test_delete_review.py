from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from game_shop.test_base import AuthenticatedAPITestCase
from games.models import Game


class TestDeleteReview(AuthenticatedAPITestCase):
    def get_url(self):
        url = f"/api/games/{self.game.id}/reviews/{self.review_id}/"
        return url

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.game = Game.objects.create(
            name="test", name_original="test", slug="test", price=1
        )

    def setUp(self):
        self.authenticate()
        response = self.client.post(
            f"/api/games/{self.game.id}/reviews/", {"content": 10 * "a"}
        )
        self.review_id = response.json()["id"]

    def test_different_user_returns_403(self):
        new_user = get_user_model().objects.create(
            username="test1", password="test1", email="test1@test.com"
        )
        token = RefreshToken.for_user(new_user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {token.access_token}"  # noqa
        )

        response = self.client.delete(self.get_url())
        self.assertEqual(
            response.status_code, 403, f"Invalid status code: {response.status_code}"
        )

    def test_delete_returns_204(self):
        response = self.client.delete(self.get_url())
        self.assertEqual(
            response.status_code, 204, f"Invalid status code: {response.status_code}"
        )
