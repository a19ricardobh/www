const solicitar= ()=>{
    let xhr= new XMLHttpRequest()
    xhr.open("GET","bibliotecas.php")
    xhr.send()
    xhr.addEventListener("readystatechange",e=>{
        if(e.target.readyState!=4){
            return
        }

        if(e.target.status>=200 && e.target.status<300){
            //let resultados=e.target.responseXML.documentElement.getElementsByTagName("item")
            /* console.log(e.target.responseXML)
            let resultados=e.target.responseXML.documentElement
            let items=resultados.querySelectorAll("item")
            Array.from(items).filter(item=>item.querySelector("TIPO_ACCESO").textContent=="Acceso restringido")
            */
            /* Primera opcion*/
            let opcion=document.getElementById("tipo").value
            let tbl=""
            if(opcion==1 || opcion==2){
                cadena=(opcion==1)?"Acceso libre":"Acceso restringido"
            }
            if (resultados.length){
                tbl+="<table border>"
                tbl+="<th>Nombre</th><th>Localidad</th><th>Pais</th>"
                for (i=0;i<resultados.length;i++){
                    if(resultados[i].getElementsByTagName("TIPO_ACCESO")[0].innerHTML==cadena){
                        tbl+="<tr>"
                        tbl+=`<td>${resultados[i].getElementsByTagName("NOMBRE")[0].innerHTML}</td>`
                        tbl+=`<td>${resultados[i].getElementsByTagName("LOCALIDAD")[0].innerHTML}</td>`
                        tbl+=`<td>${resultados[i].getElementsByTagName("PAIS")[0].innerHTML}</td>`
                        tbl+="</tr>"
             
                    }
                }
                tbl+="</table>"
            }
            document.getElementById("resultados").innerHTML=tbl
        }
        
    })
}

document.getElementById("tipo").addEventListener("change",solicitar)

