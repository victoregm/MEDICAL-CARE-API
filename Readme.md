# API Service

This repository serves as a specialized template for creating API-based services using Python and FastAPI. It is available as a template repository on GitHub, tailored to streamline the startup of event-driven projects.

## Project Structure

#### `core/`
It contains the core of the application, grouping all the essential functionalities.

#### `config/settings.py`
Stores configuration constants such as environment variables and parameters.

#### `controllers/`
It contains the controllers that handle the requests and responses of the API.

#### `enums/`
Includes all enums to define sets of named constants.

#### `middlewares/`
It contains the middlewares that are used to intercept the requests and responses of the API.

#### `models/`
Contains Pydantic schemas for data validation.

#### `routes/`
It contains the routes of the API.

#### `services/`
It groups all services such as notifications, Kafka, and specialized services (e.g. image classification).

#### `utils/`
It contains helper functions to support different parts of the code.

#### `main.py`
Application entry point. Initiates the connection to Kafka and starts the application.


## Environment Variables

The following table lists the environment variables that are essential for running this project:

| Name           | Default Value | Overwrite | Required (Production) | Description              |
| -------------- | ------------- | --------- | --------------------- | ------------------------ |
| `PROJECT_NAME` | `SERVICE`     | `YES`     | `YES`                 | The name of the project. |
| `PORT`         | `8000`        | `YES`     | `YES`                 | The port of the project. |


## Execution Steps for Development and Production

### Development

1. Run docker-compose -f docker-compose.local.yml up to start the service.
2. Go to `http://localhost:${PORT}/docs` to see the API documentation.

### Production

1. Create a `.env` file in the root directory of the project and fill in the required environment variables.
2. Run `docker-compose up` to start the service.
3. Go to `http://localhost:${PORT}/docs` to see the API documentation.




```json
{
  "id": "V26885490",
  "nombre": "Yanick Medina",
  "fecha_de_registro": "2024-04-12",
  "genero": "Hombre",
  "fecha_de_nacimiento": "1999-01-01",
  "numero_telefono": "0414-6816612",
  "email": "yanick@gmail.com",
  "antecedentes": {
    "problemas_actuales": "Ninguno",
    "observaciones": "Ninguno",
    "enfermedades": [],
    "medicamentos": [],
    "cirujias": [],
    "antecedentes_familiares": [
      "Alzheimer", "Diabetes"
    ]
  }
}

```