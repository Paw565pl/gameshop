# GameShop - backend

### Live demo

[Hosted on render.com](https://game-shop-backend.onrender.com/api/games/)

### How to run it locally?

It is fairly simple thanks to docker. Simply run this command after **cloning the repository**.

```sh
docker compose -f docker-compose.dev.yml up --build --watch
```

You can optionally seed the database.

```sh
docker exec -t backend-paw565pl-app-1 python manage.py seed_db
```

That's all! Now simply hit [http://localhost:8000/](http://localhost:8000/) and explore. API is
documented on this URL [http://localhost:8000/schema/swagger-ui/](http://localhost:8000/schema/swagger-ui/).
