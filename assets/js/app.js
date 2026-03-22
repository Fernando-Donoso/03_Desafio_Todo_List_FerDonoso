
const tareaInput = document.querySelector("#nuevatarea")
const btnAgregar = document.querySelector("#agregarTarea")
const tbody      = document.querySelector("#tareas");

const totalSpan = document.querySelector("#total");
const realizadasSpan = document.querySelector("#realizadas");


let  tareas = []


// Generar ID aleatorio
function generarID() {
    return Math.floor(Math.random() * 100);
}


// Renderizar tabla
function renderTareas() {
    let html = "";

    for (let tarea of tareas) {
        html += `
            <tr>
                <td>${tarea.id}</td>
                <td>${tarea.texto}</td>
                <td>
                    <input type="checkbox" ${tarea.realizada ? "checked" : ""} 
                        onchange="toggleRealizada(${tarea.id})">
                </td>
                <td>
                    <button onclick="eliminarTarea(${tarea.id})">X</button>
                </td>
            </tr>
        `;
    }

    tbody.innerHTML = html;

    // Actualizar contadores
    totalSpan.textContent = tareas.length;
    realizadasSpan.textContent = tareas.filter(t => t.realizada).length;
}

// Agregar tarea
btnAgregar.addEventListener("click", () => {

    const laTarea = tareaInput.value.trim() /* Eliminamos los espacios al inicio y al final */
    if (laTarea === "") {
        alert("Por favor, ingresa una tarea válida.")
        return
    }

    const nuevaTarea = {
        id: generarID(),
        laTarea,
        realizada: false
    };


    tareas.push(nuevaTarea)
    tareaInput.value = "" /* Vaciamos el input */

    renderTareas();


});

// Marcar como realizada
function toggleRealizada(id) {
    const tarea = tareas.find(t => t.id === id);
    tarea.realizada = !tarea.realizada;
    renderTareas();
}

// Eliminar tarea
function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderTareas();
}

// Render inicial
renderTareas();



