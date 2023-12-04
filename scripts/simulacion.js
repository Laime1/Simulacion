/*creacion de un metodo para mostrar la tabla, la funcion recibira dos parametros
la politica y la tabla en la que se mostrara*/
var urlParams = new URLSearchParams(window.location.search);
var datoss = datos(urlParams);
var politica = datoss.politica;
var duracion = datoss.duracion;

var tablaResultados = document.querySelector("#resultados table tbody"); 
var tablaResultados2 = document.querySelector("#resultados2 table tbody"); 

var datosTabla = new Array(); //costo Total
var datosTotales = new Array(); //costo de cada politica
    

var datosGrafico = {
    labels: ['Costo Mantenimiento', 'Costo Deficid', 'Costo Pedido'],  // Aquí ponemos etiquetas como 'Día 1', 'Día 2', etc.
    datasets: [{
        label: 'Costo Total',
        data: [],  // Aquí ponemos los costos  totales de cada día
        backgroundColor: ['orange', 'blue', 'gray'],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};
var datosAmbos = {
    labels: ['POLÍTICA 1', 'POLÍTICA 2'],  // Aquí ponemos etiquetas como 'Día 1', 'Día 2', etc.
    datasets: [{
        label: 'Costo Total',
        data: [],  // Aquí ponemos los costos  totales de cada día
        backgroundColor: ['orange', 'blue'],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};


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
var costoTotalDia, costoTotal = 0;
var costoToMa = 0, costoToDe = 0, costoToPe = 0;


    function avanzarDia(){

        if(dia<=duracion){
        //datosGrafico.labels.push(`Día ${dia}`);

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
            costoToMa += costoM;
            costoToDe += costoD;
            costoToPe += dia % 8 === 0 ? costoPedido : 0;
            datosTotales.push(costoToMa), datosTotales.push(costoToDe), datosTotales.push(costoToPe);

            inventarioI = tiempoEntrega === 0 ? cantidadPedido + inventarioF: inventarioF;
            //datosGrafico.datasets[0].data.push(costoTotalDia);
            datosTabla.push(costoTotal);

        }else{
            fila.innerHTML += `
                                   <td>${inventarioF<=10 && cantidadPedido == 0 ?pedir = "Si" : pedir = "No"}</td>
                                   <td>${inventarioF<=10 && cantidadPedido == 0 ? cantidadPedido = 30 - (inventarioF):0}</td>
                                   <td>${inventarioF<=10 && pedir === "Si" ? tiempoEntrega = generarTiempoEntrega(3):0}</td>
                                   <td>${inventarioF<=10 && pedir === "Si" ? costoPedido: 0}</td>
                                   <td>${inventarioF<=10 && pedir === "Si"  ? costoTotalDia=costoM+costoPedido:costoTotalDia=costoM+costoD}</td>`;
                costoTotal+=costoTotalDia;  

                costoToMa += costoM;
                costoToDe += costoD;
                costoToPe += inventarioF<=10 && pedir === "Si" ? costoPedido : 0;                
                datosTotales.push(costoToMa), datosTotales.push(costoToDe), datosTotales.push(costoToPe);

                inventarioI = tiempoEntrega === 0 ? cantidadPedido + inventarioF: inventarioF;
                cantidadPedido = tiempoEntrega === 0 ? 0:cantidadPedido;
                datosTabla.push(costoTotal);
                //datosGrafico.datasets[0].data.push(costoTotalDia);

        }


        tabla.appendChild(fila);
        setTimeout(avanzarDia, 500);
        dia++;
        tiempoEntrega--;

    }
  }
  avanzarDia();
//   console.log(datosTabla);
//   console.log(datosAmbos);

}


var ctx2 = document.getElementById('miGrafico2').getContext('2d');



if(politica === "politica1" || politica === "politica2"){
    document.getElementById("resultados2").remove();
    iniciarSimulacion(politica,tablaResultados);
    if(politica === "politica2"){
        document.getElementById("titulo1").innerHTML = "POLÍTICA 2";
        document.getElementById("grafico1").innerHTML = "Politica 2";
    }
    graficos(datosGrafico,"solo",datosTotales);
    //quiero crear un boton para mostrar los datos que guarde en datosGrafico, para mostrar un grafico de barras
}else{
    
    iniciarSimulacion("politica1",tablaResultados);
    iniciarSimulacion("politica2",tablaResultados2);
    graficos(datosGrafico,"gra",datosTotales);
    graficos(datosAmbos,"pie",datosTabla);

}


