const pacienteForm = document.getElementById('pacienteForm');
const enfermedadForm = document.getElementById("nombreEnfermedad");
const addedEnfermedadesList = document.getElementById('addedEnfermedadesList');
const submitBotton = document.getElementById('submitBotton');
const DOMAIN = "http://localhost:8000/pacientes";

function GetNewPaciente(){
  const paciente = { 
    id: "",
    nombre: "",
    fecha_de_registro: "",
    genero: "",
    fecha_de_nacimiento: "",
    numero_telefono: "",
    email: "",
    antecedentes: {
      problemas_actuales: "Ninguno",
      observaciones: "Ninguno",
      enfermedades: [],
      medicamentos: [],
      cirugias: [],
      antecedentes_familiares: []
      }

  }
  return paciente
} 

async function FetchPaciente(paciente_id){
  console.log('fetching from API')
  const url = `${DOMAIN}/${paciente_id}` 
  const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    });
    if (response.ok){
      paciente = await response.json()
      console.log(paciente);
      UpdatePacienteInformationHTML(paciente);
    }
    else {
      const error_response = await response.json()
      throw new Error(`couldnt create paciente. S${error_response}`)
    }
  }

async function GetPaciente(paciente_id){

  if (paciente_id === "None") {
    console.log('paciente_id is null');
    submitBotton.value = 'Crear';
    pacienteForm.addEventListener('submit', CreatePacienteInAPI);
    return GetNewPaciente()

  } else {
    console.log('paciente_id is not null');
    submitBotton.value = 'Actualizar';
    pacienteForm.addEventListener('submit', UpdatePacienteInAPI);
    return FetchPaciente(paciente_id)
  }
}

var paciente = GetNewPaciente();
console.log(paciente_id);
GetPaciente(paciente_id);

// ENFERMEDADES

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
  const list_item = document.createElement('li');
  list_item.textContent = `${enfermedad.nombre}, fecha: ${enfermedad.fecha_diagnostico}`;
  addedEnfermedadesList.appendChild(list_item);
}

function DisplayEnfermedades(){
  addedEnfermedadesList.innerHTML = ""
  paciente.antecedentes.enfermedades.forEach(item => {addEnfermedadItemToHtml(item)})
}


function removeEnfermedadItemFromHtml(event){
  const item = event.target;
  const itemsArray = Array.from(addedEnfermedadesList.children);
  const itemIndex = itemsArray.indexOf(item);
  console.log(itemIndex);
  paciente.antecedentes.enfermedades.splice(itemIndex, 1);
  DisplayEnfermedades();
}

function addEnfermedad() {
  const enfermedad = ParseEnfermedad();
  console.log(enfermedad);
  paciente.antecedentes.enfermedades.push(enfermedad);
  DisplayEnfermedades();
}


addedEnfermedadesList.addEventListener('click', removeEnfermedadItemFromHtml)


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
  const list_item = document.createElement('li');
  list_item.textContent = `${medicamento.nombre}, dosis: ${medicamento.dosis}${medicamento.unidad_dosis}. Desde: ${medicamento.fecha_inicio}`;
  addedMedicamentosList.appendChild(list_item);

}

function displayMedicamentos(){
  addedMedicamentosList.innerHTML = ""
  paciente.antecedentes.medicamentos.forEach(item => {addMedicamentoItemToHtml(item)})
}


function removeMedicamentoItemFromHtml(event){
  const item = event.target;
  const itemsArray = Array.from(addedMedicamentosList.children);
  const itemIndex = itemsArray.indexOf(item);
  console.log(itemIndex);
  paciente.antecedentes.medicamentos.splice(itemIndex, 1);
  displayMedicamentos();
}

function addMedicamento() {
  const medicamento = ParseMedicamento()
  console.log(medicamento)
  paciente.antecedentes.medicamentos.push(medicamento);
  displayMedicamentos();

}

addedMedicamentosList.addEventListener('click', removeMedicamentoItemFromHtml)


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
  const list_item = document.createElement('li');
  list_item.textContent = `${cirugia.nombre}, descripcion: ${cirugia.descripcion}, fecha: ${cirugia.fecha}`;
  addedCirugiasList.appendChild(list_item);

}


function displayCirugias(){
  addedCirugiasList.innerHTML = ""
  paciente.antecedentes.cirugias.forEach(item => {addCirugiaItemToHtml(item)})
}


function removeCirugiaItemFromHtml(event){
  const item = event.target;
  const itemsArray = Array.from(addedCirugiasList.children);
  const itemIndex = itemsArray.indexOf(item);
  console.log(itemIndex);
  paciente.antecedentes.cirugias.splice(itemIndex, 1);
  displayCirugias();
}

function addCirugia() {
  const cirugia = ParseCirugia()
  console.log(cirugia)
  addCirugiaItemToHtml(cirugia);
  paciente.antecedentes.cirugias.push(cirugia);
}


addedCirugiasList.addEventListener('click', removeCirugiaItemFromHtml)


// Antecedente
const addedAntecedentesList = document.getElementById('addedAntecedentesList');
var antecedentes_familiares = [];

function addAntecedenteItemToHtml(antecedente) {
  const list_item = document.createElement('li');
  list_item.textContent = antecedente
  addedAntecedentesList.appendChild(list_item);

}

function displayAntecedente(){
  addedAntecedentesList.innerHTML = ""
  paciente.antecedentes.antecedentes_familiares.forEach(item => {addAntecedenteItemToHtml(item)})
}

function addAntecedente() {
  const antecedente = document.getElementById('antecedenteFamiliar').value
  console.log(antecedente)
  paciente.antecedentes.antecedentes_familiares.push(antecedente);
  displayAntecedente()
}


function removeAntecedenteItemFromHtml(event){
  const item = event.target;
  const itemsArray = Array.from(addedAntecedentesList.children);
  const itemIndex = itemsArray.indexOf(item);
  console.log(itemIndex);
  paciente.antecedentes.antecedentes_familiares.splice(itemIndex, 1);
  displayAntecedente();
}


addedAntecedentesList.addEventListener('click', removeAntecedenteItemFromHtml)



function UpdatePacienteInformationHTML(paciente){
  document.getElementById('nombrePaciente').value = paciente.nombre;
  document.getElementById('cedulaPaciente').value = paciente.id;
  document.getElementById('generoPaciente').value = paciente.genero;
  document.getElementById('fecha_de_nacimiento').value = paciente.fecha_de_nacimiento;
  document.getElementById('numero_telefono').value = paciente.numero_telefono;
  document.getElementById('email').value = paciente.email;
  document.getElementById('problemas_actuales').value = paciente.antecedentes.problemas_actuales;
  document.getElementById('observaciones').value = paciente.antecedentes.observaciones;
  DisplayEnfermedades();
  displayMedicamentos();
  displayCirugias();
  displayAntecedente();
}

// UpdatePacienteInformationHTML(paciente)

function UpdatePacienceObjectFromHTML(paciente){
  paciente.fecha_de_registro = new Date().toJSON().slice(0, 10);
  paciente.nombre = document.getElementById('nombrePaciente').value;
  paciente.id = document.getElementById('cedulaPaciente').value;
  paciente.genero = document.getElementById('generoPaciente').value;
  paciente.fecha_de_nacimiento = document.getElementById('fecha_de_nacimiento').value;
  paciente.numero_telefono = document.getElementById('numero_telefono').value;
  paciente.email = document.getElementById('email').value;
  paciente.antecedentes.problemas_actuales = document.getElementById('problemas_actuales').value;
  paciente.antecedentes.observaciones = document.getElementById('observaciones').value;
  return paciente
}



function GetPacienteURL(paciente_id){
  // Get the current endpoint URL
  var currentURL = window.location.href;

  // Split the URL into parts
  var urlParts = currentURL.split('/');
  // Replace the last part with a new ID
  urlParts[urlParts.length - 1] = paciente_id;
  // Join the URL parts back together
  var modifiedURL = urlParts.join('/');
  return modifiedURL
}

async function CreatePacienteInAPI() {
  event.preventDefault();
  paciente = UpdatePacienceObjectFromHTML(paciente)
  console.log("crear paciente");
  console.log(paciente);
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
    console.log('sucessfull!')
    console.log('sucessfull!')
    next_url = GetPacienteURL(paciente.id);
    console.log(next_url);
    window.location.assign(next_url);
  }
  else {
      const error_response = await response.json()
      throw new Error(`couldnt create paciente. S${error_response}`)
  }
}

async function UpdatePacienteInAPI() {
  event.preventDefault();
  paciente = UpdatePacienceObjectFromHTML(paciente)
  console.log("actualizar paciente");
  console.log(paciente);

  const url = `${DOMAIN}/${paciente.id}` 
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(paciente),
  });
  if (response.ok){
    console.log('sucessfull!')
    next_url = GetPacienteURL(paciente.id);
    console.log(next_url);
    window.location.assign(next_url);
  }
  else {
      const error_response = await response.json()
      throw new Error(`couldnt create paciente. S${error_response}`)
  }
}

