const DOMAIN = "http://localhost:8000/pacientes";

async function FetchListPacientes() {
    const url = `${DOMAIN}/`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const pacientes = await response.json()
        const pacientesTableBody = document.getElementById('pacientesTableBody');

        if (pacientes.items.length > 0) {
            for (const paciente of pacientes.items) {
                const pacienteRow = document.createElement('tr');
                pacienteRow.innerHTML = `
                    <td>
                        <a href="/pacientes/${paciente.id}">
                            ${paciente.id}
                        </a>
                    </td>
                    <td>${paciente.nombre}</td>
                `
                pacientesTableBody.appendChild(pacienteRow);
            }

            const prevButton = document.getElementById('prev');
            const nextButton = document.getElementById('next');

            if (pacientes.links.prev) {
                prevButton.addEventListener('click', function () {
                    window.location.href = pacientes.links.prev;
                });
            } else {
                prevButton.disabled = true;
            }


            if (pacientes.links.next) {
                nextButton.addEventListener('click', function () {
                    window.location.href = pacientes.links.next;
                });
            } else {
                nextButton.disabled = true;
            }
        } else {
            const pacienteRow = document.createElement('tr');
            pacienteRow.innerHTML = `
                <td colspan="2">No hay pacientes registrados.</td>
            `
            pacientesTableBody.appendChild(pacienteRow);
        }
    }
    else {
        const error_response = await response.json()
        throw new Error(`couldnt show pacientes. S${error_response}`)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    FetchListPacientes();
});