# Game Shop

The GameShop web project is a modern e-commerce platform developed using Django and Next.js. The backend of the application is built with Django, ensuring robust and secure data management along with a RESTful API. The frontend, created with Next.js, offers dynamic and responsive user interfaces, enabling smooth browsing and purchasing of games. By combining these technologies, GameShop provides fast page loading, intuitive navigation, and easy content management. This project was created for educational purposes.

### How to run it locally?

It is fairly simple thanks to docker. Simply run this command after **cloning the repository**.

```sh
docker compose -f docker-compose.dev.yml up --build --watch
```

You can optionally seed the database.

```sh
docker compose -f docker-compose.dev.yml exec backend python manage.py seed_db
```

That's all! Now simply hit [http://localhost:3000/](http://localhost:3000/) and explore. API is available at [http://localhost:8000/api/](http://localhost:8000/api/). API is documented on this URL [http://localhost:8000/schema/swagger-ui/](http://localhost:8000/schema/swagger-ui/).
