const pacienteForm = document.getElementById('pacienteForm');
const enfermedadForm = document.getElementById("nombreEnfermedad");
const addedEnfermedadesList = document.getElementById('addedEnfermedadesList');
const addedAlergiasList = document.getElementById('addedAlergiasList');
const DOMAIN = "http://localhost:8000/pacientes";

// ALERGIAS
var alergias = [];

function ParseAlergias() {
  const nombreAlergia = document.getElementById('nombreAlergias').value;
  const fechaDiagnostico = document.getElementById('fechaDiagnostico').value;
  const alergia = {
    'nombre': nombreAlergia,
    'fecha_diagnostico': fechaDiagnostico,
  }
  return alergia
}

function addAlergiasItemToHtml(alergia) {
  const list_item = document.createElement('ul');
  list_item.textContent = `${alergia.nombre}, fecha: ${alergia.fecha_diagnostico}`;
  addedAlergiasList.appendChild(list_item);
}

function addAlergias() {
  const alergia = ParseAlergias()
  addAlergiasItemToHtml(alergia);
  alergias.push(alergia);
}


// ENFERMEDAD
var enfermedades = [];

function ParseEnfermedad() {
  const nombreEnfermedad = document.getElementById('nombreEnfermedad').value;
  const fechaDiagnostico = document.getElementById('fechaDiagnostico').value;
  const enfermedad = {
    'nombre': nombreEnfermedad,
    'fecha_diagnostico': fechaDiagnostico,
  }
  return enfermedad
}


function addEnfermedadItemToHtml(enfermedad) {
  const list_item = document.createElement('ul');
  list_item.textContent = `${enfermedad.nombre}, fecha: ${enfermedad.fecha_diagnostico}`;
  addedEnfermedadesList.appendChild(list_item);

}

function addEnfermedad() {
  const enfermedad = ParseEnfermedad()
  addEnfermedadItemToHtml(enfermedad);
  enfermedades.push(enfermedad);
}


// MEDICAMENTO

const addedMedicamentosList = document.getElementById('addedMedicamentosList');
var medicamentos = [];


function ParseMedicamento() {
  const nombreMedicamento = document.getElementById('nombreMedicamento').value;
  const dosisMedicamento = document.getElementById('dosisMedicamento').value;
  const unidadDosisMedicamento = document.getElementById('unidadDosisMedicamento').value;
  const fechaInicioMedicamento = document.getElementById('fechaInicioMedicamento').value;
  const medicamento = {
    'nombre': nombreMedicamento,
    'dosis': dosisMedicamento,
    'unidad_dosis': unidadDosisMedicamento,
    'fecha_inicio': fechaInicioMedicamento,
  }
  return medicamento
}


function addMedicamentoItemToHtml(medicamento) {
  const list_item = document.createElement('ul');
  list_item.textContent = `${medicamento.nombre}, dosis: ${medicamento.dosis}${medicamento.unidad_dosis}. Desde: ${medicamento.fecha_inicio}`;
  addedMedicamentosList.appendChild(list_item);

}

function addMedicamento() {
  const medicamento = ParseMedicamento()
  addMedicamentoItemToHtml(medicamento);
  medicamentos.push(medicamento);

}



// CIRUGIA

const addedCirugiasList = document.getElementById('addedCirugiasList');
var cirugias = [];


function ParseCirugia() {
  const nombreCirugia = document.getElementById('nombreCirugia').value;
  const fechaCirugia = document.getElementById('fechaCirugia').value;
  const descripcionCirugia = document.getElementById('descripcionCirugia').value;
  const cirugia = {
    'nombre': nombreCirugia,
    'descripcion': descripcionCirugia,
    'fecha': fechaCirugia,
  }
  return cirugia
}


function addCirugiaItemToHtml(cirugia) {
  const list_item = document.createElement('ul');
  list_item.textContent = `${cirugia.nombre}, descripcion: ${cirugia.descripcion}, fecha: ${cirugia.fecha}`;
  addedCirugiasList.appendChild(list_item);

}

function addCirugia() {
  const cirugia = ParseCirugia()
  addCirugiaItemToHtml(cirugia);
  cirugias.push(cirugia);
}


// Antecedente
const addedAntecedentesList = document.getElementById('addedAntecedentesList');
var antecedentes_familiares = [];

function addAntecedenteItemToHtml(antecedente) {
  const list_item = document.createElement('ul');
  list_item.textContent = antecedente
  addedAntecedentesList.appendChild(list_item);

}

function addAntecedente() {
  const antecedente = document.getElementById('antecedenteFamiliar').value
  addAntecedenteItemToHtml(antecedente);
  antecedentes_familiares.push(antecedente);
}


async function CreatePacienceObject() {
  event.preventDefault();

  const fecha_de_registro = new Date().toJSON().slice(0, 10);
  const nombre = document.getElementById('nombrePaciente').value;
  const cedula = document.getElementById('cedulaPaciente').value;
  const genero = document.getElementById('generoPaciente').value;
  const fecha_de_nacimiento = document.getElementById('fecha_de_nacimiento').value;
  const numero_telefono = document.getElementById('numero_telefono').value;
  const email = document.getElementById('email').value;
  const problemas_actuales = document.getElementById('problemas_actuales').value;
  const observaciones = document.getElementById('observaciones').value;


  const antecedentes = {
    'problemas_actuales': problemas_actuales,
    'observaciones': observaciones,
    'enfermedades': enfermedades,
    'medicamentos': medicamentos,
    'cirugias': cirugias,
    'antecedentes_familiares': antecedentes_familiares,
    'alergias': alergias,
  }

  const paciente = {
    'id': cedula,
    'nombre': nombre,
    'fecha_de_registro': fecha_de_registro,
    'genero': genero,
    'fecha_de_nacimiento': fecha_de_nacimiento,
    'numero_telefono': numero_telefono,
    'email': email,
    'antecedentes': antecedentes,
  }

  // send to the API
  const url = `${DOMAIN}/create` 
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(paciente),
  });
  if (response.ok){
      pacienteForm.reset();
      medicamentos = [];
      cirugias = [];
      antecedentes_familiares = [];
      enfermedades = [];
      alergias = [];
      addedMedicamentosList.innerHTML = "";
      addedCirugiasList.innerHTML = "";
      addedAntecedentesList.innerHTML = "";
      addedEnfermedadesList.innerHTML = "";

  }
  else {
      const error_response = await response.json()
      throw new Error(`couldnt create paciente. S${error_response}`)
  }
}

pacienteForm.addEventListener('submit', CreatePacienceObject);