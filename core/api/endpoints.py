from usecases import (
    CreatePaciente,
    DeletePaciente,
    FindPaciente,
    UpdatePaciente
)
from container import Container, Collection
from api.route import api_router
from domain.aggregate import Paciente
from fastapi import Depends, status, HTTPException
from pydantic import BaseModel

class DeleteResponse(BaseModel):
    id: str
    successful: bool

@api_router.get('/')
def main():
    return 'hello word!'

def check_paciente_id(
    id: str,
    repo: Collection = Depends(Container.get_repo)
    ) -> str:

    try:
        repo.find(id)
        return id
    except ValueError as e:
        http_expection = HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"paciente con id: {id} no esta registrado en la base de datos"
        )
        raise http_expection from e

@api_router.post('/create', status_code=status.HTTP_201_CREATED)
def create_paciente(
    paciente: Paciente,
    repo: Collection = Depends(Container.get_repo)
    ) -> Paciente:
    uc = CreatePaciente(repo=repo)
    _ = uc.run(paciente)
    return paciente


@api_router.get('/{id}', status_code=status.HTTP_200_OK)
def find_paciente(
    id: str = Depends(check_paciente_id),
    repo: Collection = Depends(Container.get_repo)
    ) -> Paciente:
    uc = FindPaciente(repo=repo)
    return uc.run(id)


@api_router.post('/{id}', status_code=status.HTTP_200_OK)
def update_paciente(
    paciente: Paciente,
    id: str = Depends(check_paciente_id),
    repo: Collection = Depends(Container.get_repo)
    ) -> Paciente:
    uc = UpdatePaciente(repo=repo)
    return uc.run(id, paciente)


@api_router.delete('/{id}', status_code=status.HTTP_200_OK)
def delete_paciente(
    id: str = Depends(check_paciente_id),
    repo: Collection = Depends(Container.get_repo)
    ) -> DeleteResponse:
    uc = DeletePaciente(repo=repo)
    successful = uc.run(id)
    return DeleteResponse(id=id, successful=successful)


