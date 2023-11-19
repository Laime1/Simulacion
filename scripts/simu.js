/*creacion de un metodo para mostrar la tabla, la funcion recibira dos parametros
la politica y la tabla en la que se mostrara*/
var urlParams = new URLSearchParams(window.location.search);
var datoss = datos(urlParams);
var politica = datoss.politica;
var duracion = datoss.duracion;

var tablaResultados = document.querySelector("#resultados table tbody"); 
var tablaResultados2 = document.querySelector("#resultados2 table tbody"); 



function iniciarSimulacion(politica, tabla){
var dia = 1;
var inventarioI = datoss.inventario;
var inventarioF;
const costoDeficid =datoss.costoD;
const costMantenimiento = datoss.costoM;
const costoPedido = parseInt(datoss.costoP);
var costoP;
var costoM;
var costoD;
var deficid;
var pedir, tiempoEntrega;
var cantidadPedido = 0;
var costoTotalDia, costoTotal;

    function avanzarDia(){

        if(dia<=duracion){
            
        var demandaDiaria = generarDemandaBinomial(6,0.5);
        var fila = document.createElement("tr");
        fila.innerHTML = `<td>${dia}</td>    
        <td>${inventarioI}</td>
        <td>${demandaDiaria}</td>`;

        inventarioF = (inventarioI - demandaDiaria) < 0 ? 0 : inventarioI - demandaDiaria;
        deficid = (inventarioI - demandaDiaria) < 0 ? Math.abs(inventarioI - demandaDiaria) : 0;
        inventarioI = inventarioF;
        costoM = parseInt(inventarioF*costMantenimiento);
        costoD = deficid*costoDeficid;

        fila.innerHTML += `<td>${inventarioF}</td>
                           <td>${deficid}</td>
                           <td>${costoM}</td>
                           <td>${costoD}</td>`;

        if(politica === "politica1"){//si en el formulario se eligio la politica 1 se calculara lo siguiente
                
            fila.innerHTML += `
                               <td>${dia%8 === 0 ? pedir = "Si" : pedir = "No" }</td> 
                               <td>${dia%8 === 0 ? cantidadPedido=30 - (inventarioF):0}</td>
                               <td>${dia%8 === 0 ? tiempoEntrega = generarTiempoEntrega(3):0}</td>
                               <td>${dia%8 ===0 ? costoPedido: 0}</td>
                               <td>${dia%8 ===0 ? costoTotalDia=costoM+costoPedido:costoTotalDia=costoM+costoD}</td>`; 
            costoTotal+=costoTotalDia;   //El costo total  acumulado de cada dia
            inventarioI = tiempoEntrega === 0 ? cantidadPedido + inventarioF: inventarioF;

        }else{
            fila.innerHTML += `
                                   <td>${inventarioF<=10 && cantidadPedido == 0 ?pedir = "Si" : pedir = "No"}</td>
                                   <td>${inventarioF<=10 && cantidadPedido == 0 ? cantidadPedido = 30 - (inventarioF):0}</td>
                                   <td>${inventarioF<=10 && pedir === "Si" ? tiempoEntrega = generarTiempoEntrega(3):0}</td>
                                   <td>${inventarioF<=10 && pedir === "Si" ? costoPedido: 0}</td>
                                   <td>${inventarioF<=10 && pedir === "Si"  ? costoTotalDia=costoM+costoPedido:costoTotalDia=costoM+costoD}</td>`;
                costoTotal+=costoTotalDia;   
                inventarioI = tiempoEntrega === 0 ? cantidadPedido + inventarioF: inventarioF;
                cantidadPedido = tiempoEntrega === 0 ? 0:cantidadPedido;
        }

        

        tabla.appendChild(fila);
        setTimeout(avanzarDia, 500);
        dia++;
        tiempoEntrega--;

    }
  }
  avanzarDia();
}
if(politica === "politica1" || politica === "politica2"){
    document.getElementById("resultados2").remove();
    iniciarSimulacion(politica,tablaResultados);
}else{
    iniciarSimulacion("politica1",tablaResultados);
    iniciarSimulacion("politica2",tablaResultados2);
}