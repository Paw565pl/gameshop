from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from game_shop.test_base import AuthenticatedAPITestCase
from games.models import Game


# Create your tests here.
class TestUpdateReview(AuthenticatedAPITestCase):
    test_data = {"content": 10 * "b"}

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

    def get_url(self):
        url = f"/api/games/{self.game.id}/reviews/{self.review_id}/"
        return url

    def test_different_author_returns_403(self):
        new_user = get_user_model().objects.create(
            username="test1", password="test1", email="test1@test.com"
        )
        token = RefreshToken.for_user(new_user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {token.access_token}"  # noqa
        )

        url = self.get_url()
        response = self.client.patch(url, self.test_data)
        self.assertEqual(
            response.status_code, 403, f"Invalid status code: {response.status_code}"
        )

    def test_update_returns_200(self):
        url = self.get_url()
        response = self.client.patch(url, self.test_data)
        self.assertEqual(
            response.status_code, 200, f"Invalid status code: {response.status_code}"
        )
