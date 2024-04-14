import json
from typing import Dict, Any,  get_args,  Protocol, Optional, TypeVar
from pydantic import BaseModel
from pymongo.collection import Collection

PydanticModel = TypeVar('PydanticModel', bound=BaseModel)

def add_id(document: Dict[str, Any]) -> Dict[str, Any]:
    if 'id' in document:
        document['_id'] = document['id']
    return document

def pydantic_to_json(model: BaseModel) -> Dict[str, Any]:
    document = json.loads(model.model_dump_json())
    document = add_id(document)
    return document


# TODO: ADD SESSION
class MongoRepository(Protocol[PydanticModel]):
    collection: Collection

    @property
    def _model(self) -> PydanticModel:
        return get_args(self.__orig_bases__[0])[0]

    
    def find_or_none(self, _id: str) -> Optional[PydanticModel]:
        document = self.collection.find_one({'_id': _id})
        if document:
            return self._model(**document)
        
    def find(self, _id: str) -> PydanticModel:
        item = self.find_or_none(_id)
        if item is None:
            raise ValueError(f'id: {_id} do not exists')
        return item
    
    def create(self, item: PydanticModel) -> PydanticModel:
        assert isinstance(item, self._model)
        document = pydantic_to_json(item)
        result = self.collection.insert_one(document)
        assert result.acknowledged
        return item
        
    
    def delete(self, _id: str) -> bool:
        result = self.collection.delete_one({'_id': _id})
        assert result.acknowledged
        return result.acknowledged
        
    def update(self, _id: str, item: PydanticModel) -> PydanticModel:
        document = pydantic_to_json(item)
        self.collection.replace_one({"_id": _id}, document)
        return item