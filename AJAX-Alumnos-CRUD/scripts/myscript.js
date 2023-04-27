const $d = document,
  $formulario = $d.querySelector("form"),
  $contactos = $d.querySelector("tbody"),
  $submit = $d.querySelector("#add"),
  $table = $d.querySelector("table");

/* function ajax(options) { //con Httprequest
  let { url, method, fsuccess, ferror, data } = options;

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      fsuccess(json);
    } else {
      ferror({
        status: xhr.status,
        statusText: xhr.statusText || "Ocurrió un error",
      });
    }
  });

  xhr.open(method || "GET", url);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send(JSON.stringify(data));
} */
/* function ajax(options){ //con fetch
  let { url, method, fsuccess, ferror, data } = options;
  const opciones={
    method: method || "GET",
    headers: {"Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(data)
  }
  fetch(url, opciones)
  .then(respuesta=>
      //console.log(respuesta)

       (respuesta.ok)?respuesta.json():Promise.reject(respuesta)
    )
  .then(json=>fsuccess(json))
  .catch(error=>
    ferror({
      status: error.status,
      statusText: error.statusText || "Ocurrió un error"
    }))
} */

/* async function ajax(options){ //const ajax=async (options) =>{
  let { url, method, fsuccess, ferror, data } = options;
  const opciones={
    method: method || "GET",
    headers: {"Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(data)
  }
  try{
    const resp=await fetch(url,opciones)
    if(!resp.ok){
      throw{status:resp.status,statusText:resp.statusText}
    }
    const json=await resp.json()
    fsuccess(json)
  }catch(error){
    ferror(error)
  }
} */

function ajax(options){ //con libreria Axios
  let { url, method, fsuccess, ferror, data } = options
  const opciones={
    method: method || "GET",
    headers: {"Content-type": "application/json; charset=utf-8"},
    body: JSON.stringify(data)
  }
  axios(url,opciones)
  .then(resp=>fsuccess(resp.data))
  .catch(error=>ferror({status:error.response.status,statusText:error.response.statusText}))
}

function renderAlumnos(datosUsuarios) {
  const $template = $d.querySelector("#template-fila").content;
  const $fragmento = $d.createDocumentFragment();
  
  $contactos.innerHTML = "";
  datosUsuarios.forEach((usuario) => {
    let $clon = $template.cloneNode(true);
    const $celdas = $clon.querySelectorAll("td");
    
    $celdas[0].textContent = usuario.nombre;
    $celdas[1].textContent = usuario.apellidos;
    $celdas[2].textContent = usuario.email;
    $celdas[$celdas.length - 1].querySelectorAll("a").forEach((enlace) => {
      enlace.dataset.row = usuario.id;
    });
    
    $fragmento.append($clon);
  });
  $contactos.append($fragmento);
}

function renderFormulario(alumno) {
  $formulario.nombre.value = alumno.nombre;
  $formulario.apellidos.value = alumno.apellidos;
  $formulario.email.value = alumno.email;
  $formulario.add.dataset.row = alumno.id;
}

function getAlumnos() {
  ajax({
    url: "http://localhost:3000/alumnos",
    fsuccess: (datosAlumnos) => renderAlumnos(datosAlumnos),
    ferror: (err) => {
      $table.insertAdjacentHTML(
        "afterend",
        `<p><b>Error ${err.status}: ${err.statusText}</b></p>`
      );
    },
  });
}

function addAlumno(e) {
  e.preventDefault();
  if (!e.target.add.dataset.row) {
    //Create - POST
    ajax({
      url: "http://localhost:3000/alumnos",
      method: "POST",
      fsuccess: (res) => {
        $formulario.reset();
        location.reload();
      },
      ferror: (err) =>
        $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
      data: {
        nombre: $formulario.nombre.value,
        apellidos: $formulario.apellidos.value,
        email: $formulario.email.value,
      },
    });
  } else {
    //Update - PUT
    ajax({
      url: `http://localhost:3000/alumnos/${e.target.add.dataset.row}`,
      method: "PUT",
      fsuccess: (res) => {
        $formulario.reset();
        location.reload();
      },
      ferror: (err) =>
        $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
      data: {
        nombre: $formulario.nombre.value,
        apellidos: $formulario.apellidos.value,
        email: $formulario.email.value,
      },
    });
  }
}

function procesaAccion(e) {
  e.preventDefault();
  switch (e.target.textContent) {
    case "Delete":
      let isDelete = confirm(
        `¿Estás seguro de eliminar el id ${e.target.dataset.row}?`
      );
      if (isDelete) {
        //Delete - DELETE
        ajax({
          url: `http://localhost:3000/alumnos/${e.target.dataset.row}`,
          method: "DELETE",
          fsuccess: (res) => location.reload(),
          ferror: (err) => alert(err),
        });
      }
      break;
    case "Update":
      ajax({
        url: `http://localhost:3000/alumnos/${e.target.dataset.row}`,
        fsuccess: (datosAlumno) => renderFormulario(datosAlumno),
        ferror: (err) => {
          console.log(err);
          $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
      });
      $submit.value = "Actualizar";
      $submit.dataset.row = e.target.dataset.row;
      $contactos.removeEventListener("click", procesaAccion);
      $contactos.querySelectorAll("a").forEach((enlace) => {
        if (enlace.textContent == "Delete") {
          enlace.classList.remove("delete");
        } else {
          enlace.classList.remove("update");
        }
        enlace.classList.add("desactivado");
      });
  }
}

$formulario.addEventListener("submit", addAlumno);
$contactos.addEventListener("click", procesaAccion);

$d.addEventListener("DOMContentLoaded", getAlumnos);
