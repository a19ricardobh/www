const solicitar= ()=>{
    let xhr= new XMLHttpRequest()
    xhr.open("GET","bibliotecas.php")
    xhr.send()
    xhr.addEventListener("readystatechange",e=>{
        if(e.target.readyState!=4){
            return
        }

        if(e.target.status>=200 && e.target.status<300){
            let resultados=e.target.responseXML
            console.log(resultados)
        }
    })
}

document.getElementById("tipo").addEventListener("change",solicitar)