from typing import Protocol
from abc import abstractclassmethod
from dataclasses import dataclass
from infrastructure.repository import PacienteRepository
from domain.aggregate import Paciente

class UseCase(Protocol):
    @abstractclassmethod
    def run(self):
        raise NotImplementedError
    
@dataclass
class ListPacientes(UseCase):
    repo: PacienteRepository

    def run(self, page: int = 1, per_page: int = 10) -> list[Paciente]:
        return self.repo.list_json(page=page, per_page=per_page)
    
@dataclass
class CreatePaciente(UseCase):
    repo: PacienteRepository

    def run(self, paciente: Paciente) -> None:
        _ = self.repo.create(paciente)
        return paciente

@dataclass
class DeletePaciente(UseCase):
    repo: PacienteRepository

    def run(self, paciente: Paciente) -> None:
        return self.repo.delete(paciente)

@dataclass
class FindPaciente(UseCase):
    repo: PacienteRepository

    def run(self, id: str) -> Paciente:
        paciente = self.repo.find(id)
        return paciente
    

@dataclass
class UpdatePaciente(UseCase):
    repo: PacienteRepository

    def run(self, id: str, paciente: Paciente) -> Paciente:
        paciente = self.repo.update(id, paciente)
        return paciente