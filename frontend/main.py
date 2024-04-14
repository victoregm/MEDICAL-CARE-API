from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/registro", response_class=HTMLResponse)
async def create(request: Request):
    return templates.TemplateResponse(
        request=request, name="home.html", context={"paciente_id": None}
    )


@app.get("/{paciente_id}", response_class=HTMLResponse)
async def get(request: Request, paciente_id: str):
    return templates.TemplateResponse(
        request=request, name="home.html", context={"paciente_id": paciente_id}
    )