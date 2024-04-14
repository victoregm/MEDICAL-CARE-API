from pymongo.collection import Collection
from pymongo import MongoClient
from settings import (
    mongo_settings,
    MongoSettings
)
from infrastructure.repository import PacienteRepository

def setup_mongo_engine(settings: MongoSettings) -> MongoClient:
    engine = MongoClient(
        settings.MONGO_HOST,
        settings.MONGO_PORT,
        username=settings.MONGO_USERNAME,
        password=settings.MONGO_PASSWORD
        )

    return engine


def setup_job_collection(engine: MongoClient, settings: MongoSettings) -> Collection:
    db = engine[settings.MONGO_DATABASE_NAME]
    return db[settings.MONGO_COLLECTION_NAME]


class Container:
    
    @staticmethod
    def get_repo() -> Collection:
        mongo_engine = setup_mongo_engine(mongo_settings)
        collection = setup_job_collection(mongo_engine, mongo_settings)

        repo = PacienteRepository(collection=collection)
        return repo


