# GameShop - backend

### Live demo

[Hosted on render.com](https://game-shop-backend.onrender.com/api/games/)

### How to run it locally?

It is fairly simple thanks to docker. Simply run this command after **cloning the repository**.

```bash
docker compose up --build -d
```

You can optionally seed the database.

```bash
docker exec -t backend-paw565pl-app-1 python manage.py seed_db
```

That's all! Now simply hit [http://localhost:8000](http://localhost:8000) and explore.
