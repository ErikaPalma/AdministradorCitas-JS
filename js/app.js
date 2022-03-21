//Campos formulario

const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");
//UI
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

let editando;

class Citas {
  constructor() {
    //En cuanto se cree la instancia crea un array vacío
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }

  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id != id);
  }

  editarCita(citaActualizada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaActualizada.id ? citaActualizada : cita
    );
  }
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    //Crear el div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    //Agregar clase según tipo de error
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    //Contenido del mensaje de error
    divMensaje.textContent = mensaje;

    //Añadir al DOM
    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    //Quitar alerta tras 3segundos
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  //Para acceder al array de citas puedo hacer destructuring al parámetro que recibe
  imprimirCitas({ citas }) {
    this.limpiarHTML();
    //estamos extrayendo esa parte del objeto, accediendo al array de citas
    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;
      //Cada cita va a estar en un div
      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3", "card", "card-body");
      //Añadirle un atributo
      divCita.dataset.id = id;

      //Scripting de los elementos de la cita
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.classList.add("card-text");
      propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario: </span> ${propietario}
      `;

      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.classList.add("card-text");
      telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Telefono: </span> ${telefono}
      `;

      const fechaParrafo = document.createElement("p");
      fechaParrafo.classList.add("card-text");
      fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha: </span> ${fecha}
      `;

      const horaParrafo = document.createElement("p");
      horaParrafo.classList.add("card-text");
      horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora: </span> ${hora}
      `;

      const sintomasParrafo = document.createElement("p");
      sintomasParrafo.classList.add("card-text");
      sintomasParrafo.innerHTML = `
        <span class="font-weight-bolder">Síntomas: </span> ${sintomas}
      `;

      //Botón para eliminar cita

      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML =
        'ELIMINAR <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>';

      btnEliminar.onclick = () => eliminarCita(id);

      //Botón para editar cita
      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info", "mr-2");
      btnEditar.innerHTML =
        'EDITAR <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

      btnEditar.onclick = () => cargarEdicion(cita);
      //Añadir los párrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      //Añadir citas al html
      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

//Instancia de forma global
const administrarCitas = new Citas();
const ui = new UI();

eventListeners();
function eventListeners() {
  mascotaInput.addEventListener("input", datosCita);
  propietarioInput.addEventListener("input", datosCita);
  telefonoInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  sintomasInput.addEventListener("input", datosCita);
  formulario.addEventListener("submit", nuevaCita);
}

//Objeto con info de las citas
const citaObjeto = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

//Añade los datos al objeto de cita
function datosCita(e) {
  //Accedo a las propiedades
  citaObjeto[e.target.name] = e.target.value;
}

//Validar y agregar nueva cita en la clase de citas
function nuevaCita(e) {
  e.preventDefault();

  //Extraer la info del objeto de cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObjeto;

  //validar

  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");
    return;
  }

  if (editando) {
    ui.imprimirAlerta("Tu cita se ha modificado correctamente");
    //Pasar el objeto de la cita a edición
    administrarCitas.editarCita({ ...citaObjeto });
    //Cambiar texto del botón
    formulario.querySelector('button[type="submit"]').textContent =
      "CREAR CITA";
    //Quitar modo edición
    editando = false;
  } else {
    //Generar id único
    citaObjeto.id = Date.now();
    //Si pasa la validación, se crea una nueva cita
    administrarCitas.agregarCita({ ...citaObjeto });

    //Mensaje añadido correctamente
    ui.imprimirAlerta("Tu cita se añadió correctamente");
  }

  //Reiniciar objeto para la validación
  reiniciarObjeto();
  //Resetear formulario
  formulario.reset();

  //Mostrar el HTML de las citas
  ui.imprimirCitas(administrarCitas);
}

//Al igual que se resetea el formulario hay que reiniciar también los valores del objeto
function reiniciarObjeto() {
  citaObjeto.mascota = "";
  citaObjeto.propietario = "";
  citaObjeto.telefono = "";
  citaObjeto.fecha = "";
  citaObjeto.hora = "";
  citaObjeto.sintomas = "";
}

function eliminarCita(id) {
  //Eliminar cita
  administrarCitas.eliminarCita(id);
  //Mostrar mensaje
  ui.imprimirAlerta("Tu cita se ha eliminado correctamente");
  //Refrescar cita
  ui.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  //Llenar los inputs para poder hacer la edición
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  //Llenar el objeto
  citaObjeto.mascota = mascota;
  citaObjeto.propietario = propietario;
  citaObjeto.telefono = telefono;
  citaObjeto.fecha = fecha;
  citaObjeto.hora = hora;
  citaObjeto.sintomas = sintomas;
  citaObjeto.id = id;

  //Cambiar texto del botón

  formulario.querySelector('button[type="submit"]').textContent =
    "Guardar cambios";

  editando = true;
}
