import { eliminarCita, cargarEdicion } from "../funciones.js";
import { contenedorCitas, heading } from "../selectores.js";
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
  textoHeading(citas) {
    if (citas.length > 0) {
      heading.textContent = "Administra tus citas";
    } else {
      heading.textContent = "No tienes citas. Comienza creando una";
    }
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

export default UI;
