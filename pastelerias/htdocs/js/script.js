const   $d=document,
        $form=$d.querySelector("form"),
        $rdo=$d.querySelector("#resultados")
let provincias=[]

$d.addEventListener("DOMContentLoaded",e=>{
    let div=$d.createElement("div")
    div.setAttribute("class","content-select")
    let boton=$d.createElement("select")
    boton.setAttribute("id","provincia")
    fetch("json.php", { method: "GET" })
        .then(respuesta=>{ 
            return (respuesta.ok)?respuesta.text():Promise.reject(respuesta)
          })
        .then(texto=>{
            
            let titulo=$d.createElement("option")
            titulo.setAttribute("value","0")
            titulo.append("Provincias")
            boton.appendChild(titulo)
            JSON.parse(texto).forEach(element => {
                
                if (!provincias.includes(element.territory)){
                    provincias.push(element.territory)
                    let opcion=$d.createElement("option")
                    opcion.setAttribute("value",element.territorycode)
                    opcion.append(element.territory)
                    boton.appendChild(opcion)
                }
            })
        })
        .catch(error=>{
           const mensaje=error.statusText + ". Ocurrió un error"
           $rdo.innerHTML=`Error ${error.status}: ${mensaje}` 
         })
    div.appendChild(boton)
    let i=$d.createElement("i")
    div.appendChild(i)
    $form.appendChild(div)
})

function render(e){
    
    fetch("json.php", { method: "GET" })
        .then(respuesta=>{ 
            return (respuesta.ok)?respuesta.text():Promise.reject(respuesta)
          })
        .then(texto=>{
            $rdo.innerHTML=""
            let tbl=$d.createElement("table")
            //cabecera
            let cab=$d.createElement("tr")
            let th1=$d.createElement("th")
            th1.append("Empresa")
            cab.appendChild(th1)
            let th2=$d.createElement("th")
            th2.append("Localidad")
            cab.appendChild(th2)
            let th3=$d.createElement("th")
            th3.append("Telefono")
            cab.appendChild(th3)
            let th4=$d.createElement("th")
            th4.append("Url")
            cab.appendChild(th4)
                    
            tbl.appendChild(cab)
            JSON.parse(texto).forEach(elt => {
                if (elt.territorycode==e.target.value){
                    //console.log(elt.documentName)                    
                    //lineas
                    let linea=$d.createElement("tr")
                    let ln1=$d.createElement("td")
                    ln1.append(elt.documentName)
                    linea.appendChild(ln1)
                    let ln2=$d.createElement("td")
                    ln2.append(elt.locality)
                    linea.appendChild(ln2)
                    let ln3=$d.createElement("td")
                    ln3.append(elt.phone)
                    linea.appendChild(ln3)
                    let ln4=$d.createElement("td")
                    ln4.append(elt.web)
                    linea.appendChild(ln4)
                    //
                    tbl.appendChild(linea)
                }
            })
            $rdo.appendChild(tbl)
        })
        .catch(error=>{
           const mensaje=error.statusText + ". Ocurrió un error"
           $rdo.innerHTML=`Error ${error.status}: ${mensaje}` 
         })
    
}
const n=$d.querySelector("form")
n.addEventListener("change",render)