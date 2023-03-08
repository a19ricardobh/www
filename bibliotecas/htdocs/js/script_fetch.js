const $d=document,
        $resultados=$d.querySelector("#resultados")

        

function render(e){
  let cadena=""
  if(e.target.value==1 || e.target.value==2){
    cadena=(e.target.value==1)?"Acceso libre":"Acceso restringido"
  }
        fetch("bibliotecas.php", { method: "GET" })
        .then(respuesta=>{ 
            return (respuesta.ok)?respuesta.text():Promise.reject(respuesta)
          })
        .then(texto=>{
            //console.log(texto)
            let parser= new DOMParser()
            let xml=parser.parseFromString(texto,"application/xml").documentElement
            let items=xml.querySelectorAll("item")
            
            let datos=Array.from(items).filter(item=>item.querySelector("TIPO_ACCESO").textContent==cadena)
            //console.log(datos)
            let tbl=""
            tbl+="<table border>"
            tbl+="<th>Nombre</th><th>Localidad</th><th>Pais</th>"
            datos.forEach(el => {
              /* console.log(el.children)
              let array=Array.from(el.children)
              console.log(el.getElementsByTagName("PAIS")[0].textContent)
              //console.log(array)
              tbl+="<tr>"
              //console.log(el.children.nodeName("NOMBRE"))
              /* array.forEach(e => {
                
                if (e.nodeName=="NOMBRE"){
                  tbl+=`<td>${e.textContent}</td>`
                }
                if (e.nodeName=="LOCALIDAD"){
                  tbl+=`<td>${e.textContent}</td>`
                }
                if (e.nodeName=="PAIS"){
                  tbl+=`<td>${e.textContent}</td>`
                }
              }) */ 
              tbl+="<tr>"
              tbl+=`<td>${el.getElementsByTagName("NOMBRE")[0].textContent}</td>`
              tbl+=`<td>${el.getElementsByTagName("LOCALIDAD")[0].textContent}</td>`
              tbl+=`<td>${el.getElementsByTagName("PAIS")[0].textContent}</td>`
              tbl+="</tr>" 
            })
            tbl+="</table>"
            //console.log(tbl)
            $resultados.innerHTML=tbl
        })
        .catch(error=>{
           const mensaje=error.statusText + ". Ocurrió un error"
           $resultados.innerHTML=`Error ${error.status}: ${mensaje}` 
         })
        .finally(()=>console.log("Esto se ejecuta siempre"))  
}

document.getElementById("tipo").addEventListener("change",render)