from domain.aggregate import Paciente
from shared.mongodb.repository import MongoRepository
from pymongo.collection import Collection

class PacienteRepository(MongoRepository[Paciente]):
    def __init__(self, collection: Collection):
        self.collection = collection