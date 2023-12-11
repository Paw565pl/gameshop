from djongo import database
from pymongo import MongoClient
from pymongo.database import Database, Collection
from django.conf import settings


def get_mongo_collection(collection_name: str) -> Collection | None:
    db_name = settings.DATABASES["default"]["NAME"]

    client: MongoClient = database.connect("")
    db: Database = client[db_name]

    collections = db.list_collection_names()

    if collection_name not in collections:
        raise ValueError(f"collection {collection_name} does not exist in the database")

    collection: Collection = db[collection_name]
    return collection
