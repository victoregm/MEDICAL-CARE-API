from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import date, datetime

def get_current_date() -> date:
    return datetime.now().date()

class Enfermedades(BaseModel):
    nombre: str
    fecha_diagnostico: Optional[date] = None

class Alergias(BaseModel):
    nombre: str
    fecha_diagnostico: Optional[date] = None

class Medicamentos(BaseModel):
    nombre: str
    dosis: str
    unidad_dosis: str = 'mg'
    fecha_inicio: Optional[date] = None

class Cirujias(BaseModel):
    nombre: str
    fecha: Optional[date] = None
    descripcion: Optional[str] = None

class Antecedentes(BaseModel):
    problemas_actuales: Optional[str] = None
    observaciones: Optional[str] = None
    enfermedades: Optional[List[Enfermedades]]
    medicamentos: Optional[List[Medicamentos]]
    cirugias: Optional[List[Cirujias]] = None
    antecedentes_familiares: Optional[List[str]] = None
    alergias: Optional[List[Alergias]] = None


class Paciente(BaseModel):
    id: str
    nombre: str
    fecha_de_registro: str = Field(default_factory=get_current_date)
    genero: str
    fecha_de_nacimiento: str
    numero_telefono: str
    email: str
    antecedentes: Antecedentes
