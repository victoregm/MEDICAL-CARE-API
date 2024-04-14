from pydantic_settings import BaseSettings

class APISettings(BaseSettings):
    pass

class MongoSettings(BaseSettings):
    MONGO_HOST: str
    MONGO_PORT: int
    MONGO_USERNAME: str
    MONGO_PASSWORD: str
    MONGO_DATABASE_NAME: str
    MONGO_COLLECTION_NAME: str


api_settings = APISettings()
mongo_settings = MongoSettings()
