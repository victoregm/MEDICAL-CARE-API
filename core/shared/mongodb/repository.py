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
    
    def list(self, page: int = 1, per_page: int = 10) -> list[PydanticModel]:
        skip = (page - 1) * per_page
        documents = self.collection.find().skip(skip).limit(per_page)
        return [self._model(**document) for document in documents]
    
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

    def list_json(self, page: int = 1, per_page: int = 10) -> Dict[str, Any]:
        """
        Returns a JSON representation of the paginated list of items, including links to the next and previous pages.

        Args:
            page: The page number to retrieve.
            per_page: The number of items per page.

        Returns:
            A dictionary containing the paginated list of items in JSON format, along with links to the next and previous pages.
        """
        items = self.list(page, per_page)
        total_count = self.collection.count_documents({})
        total_pages = (total_count + per_page - 1) // per_page

        links = {
            "prev": None,
            "next": None
        }
        if page > 1:
            links["prev"] = f"/api/v1/{self._model.__name__.lower()}?page={page - 1}&per_page={per_page}"
        if page < total_pages:
            links["next"] = f"/api/v1/{self._model.__name__.lower()}?page={page + 1}&per_page={per_page}"

        return {
            "items": [item.model_dump(by_alias=True) for item in items],
            "page": page,
            "per_page": per_page,
            "total": total_count,
            "links": links
        }

