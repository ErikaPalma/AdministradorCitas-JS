import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";
import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomasInput,
  formulario,
} from "./selectores.js";
//Instancia de forma global
const administrarCitas = new Citas();
const ui = new UI();

let editando = false;

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
export function datosCita(e) {
  //Accedo a las propiedades
  citaObjeto[e.target.name] = e.target.value;
}

//Validar y agregar nueva cita en la clase de citas
export function nuevaCita(e) {
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
export function reiniciarObjeto() {
  citaObjeto.mascota = "";
  citaObjeto.propietario = "";
  citaObjeto.telefono = "";
  citaObjeto.fecha = "";
  citaObjeto.hora = "";
  citaObjeto.sintomas = "";
}

export function eliminarCita(id) {
  //Eliminar cita
  administrarCitas.eliminarCita(id);
  //Mostrar mensaje
  ui.imprimirAlerta("Tu cita se ha eliminado correctamente");
  //Refrescar cita
  ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
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
