
const tareaInput = document.querySelector("#nuevatarea")
const btnAgregar = document.querySelector("#agregarTarea")
const tbody      = document.querySelector("#tareas");

const totalSpan = document.querySelector("#total");
const completadasSpan = document.querySelector("#completadas");


let  tareas = []


// Generar ID aleatorio
function generarID() {
    return Date.now();
}


// Renderizar tabla
function renderTareas() {
    let html = "";

    for (let tarea of tareas) {
        html += `
            <tr>
                <td>${tarea.id}</td>
                <td>${tarea.laTarea}</td>
                <td>
                    <input type="checkbox" ${tarea.completada ? "checked" : ""} 
                        onclick="tareaRealizada(${tarea.id})">
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
    completadasSpan.textContent = tareas.filter(t => t.completada).length;
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
        completada: false
    };

    tareas.push(nuevaTarea)
    tareaInput.value = "" /* Vaciamos el input */

    renderTareas();
});

// Marcar como realizada
function tareaRealizada(id) {
    id = Number(id);
    tareas = tareas.map(t => {
        if (t.id === id) {
            return {
                ...t,
                completada: !t.completada
            };
        }
        return t;
    });
    renderTareas();
}

// Eliminar tarea
function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderTareas();
}

// Render inicial
renderTareas();
