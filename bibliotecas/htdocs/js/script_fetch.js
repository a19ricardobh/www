const $d=document,
        $resultados=$d.querySelector("#resultados")

        fetch("bibliotecas.php", { method: "GET" })
        .then(respuesta=>{ 
            return (respuesta.ok)?respuesta.text():Promise.reject(respuesta)
          })
        .then(texto=>{
            //console.log(texto)
            let parser= new DOMParser()
            let xml=parser.parseFromString(texto,"application/xml").documentElement
            let items=xml.querySelectorAll("item")
            let restr=Array.from(items).filter(item=>item.querySelector("TIPO_ACCESO").textContent=="Acceso restringido")
            //console.log(restr)
            let tbl=""
            tbl+="<table border>"
            tbl+="<th>Nombre</th><th>Localidad</th><th>Pais</th>"
            restr.forEach(el => {
              //console.log(el.children)
              tbl+="<tr>" 
              tbl+=`<td>${el.children[1].textContent}</td>`
              tbl+=`<td>${el.children[5].textContent}</td>`
              tbl+=`<td>${el.children[8].textContent}</td>`
              tbl+="</tr>" 
            })
            tbl+="</table>"
            //console.log(tbl)
            $resultados.appendChild(tbl)
        })
        .catch(error=>{
           const mensaje=error.statusText + ". Ocurrió un error"
           $resultados.innerHTML=`Error ${error.status}: ${mensaje}` 
         })
        .finally(()=>console.log("Esto se ejecuta siempre"))  
