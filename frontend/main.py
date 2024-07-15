from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get('/', response_class=HTMLResponse)
async def get(request: Request):
    return templates.TemplateResponse(
        request=request, name="home.html"
    )

@app.get('/pacientes', response_class=HTMLResponse)
async def get(request: Request):
    return templates.TemplateResponse(
        request=request, name="pacientes.html"
    )

@app.get('/pacientes/registro', response_class=HTMLResponse)
async def get(request: Request):
    return templates.TemplateResponse(
        request=request, name="registro.html"
    )


@app.get("/pacientes/{paciente_id}", response_class=HTMLResponse)
async def get(request: Request, paciente_id: str):
    return templates.TemplateResponse(
        request=request, name="paciente_id.html", context={"paciente_id": paciente_id}
    )