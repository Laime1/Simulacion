
let politica = "";
let duracion = 0;

document.addEventListener("DOMContentLoaded", function () {
    
    // Obtén los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Lee los valores de los parámetros
     politica = urlParams.get("politica");
     duracion = urlParams.get("duracion");

});


function generarDemandaBinomial(n, p) {
    const probabilidadExito = p;
    let demandaDiaria = 0;

    for (let i = 0; i < n; i++) {
        const numeroAleatorio = Math.random();
        if (numeroAleatorio < probabilidadExito) {
            demandaDiaria++;
        }
    }
    return demandaDiaria;
}

function generarTiempoEntrega(lambda) {
    const random = Math.random();
    let tiempo = 0;
    let probabilidadAcumulada = Math.exp(-lambda);

    while (random > probabilidadAcumulada) {
        tiempo++;
        probabilidadAcumulada += Math.exp(-lambda) * Math.pow(lambda, tiempo) / factorial(tiempo);
    }

    return tiempo; // El tiempo de entrega en días
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function iniciarSimulacion() {
    const urlParams = new URLSearchParams(window.location.search);
    politica = urlParams.get("politica");
    duracion = urlParams.get("duracion");


    var tablaResultados = document.querySelector("#resultados table tbody");
 
    var dia = 1;
    var inventarioI = 30;
    var inventarioF=0;
    var costMantenimiento = 1;
    var tiempoEntrega = -1;
    var cantidadPedido = 0;
    var costoPedido = 50;
    var costoDeficid = 10;
    var deficid = 0;
    var pedir = "No";
    var costoTotalDia = 0;
    var costoTotal = 0;
    var total = document.createElement("label"); 


    function avanzarDia() {
        if (dia <= duracion) {
            var demandaDiaria = generarDemandaBinomial(6, 0.5);
            var fila = document.createElement("tr");
            fila.innerHTML = `<td>${dia}</td>
                             <td>${inventarioI}</td>
                             <td>${demandaDiaria}</td>`;

                             if ((inventarioI - demandaDiaria) < 0) {
                                inventarioF=0;
                                deficid = Math.abs(inventarioI - demandaDiaria);
                                 costoDeficid = deficid*10;
                                 
                                fila.innerHTML += `<td>0</td>
                                                   <td>${deficid}</td>`;
                            } else {
                                costoDeficid = 0;
                                inventarioF=inventarioI - demandaDiaria;
                                fila.innerHTML += `<td>${inventarioF}</td>
                                                   <td>0</td>`;
                            }
                            costMantenimiento = inventarioF*1;
                            fila.innerHTML += `<td>${costMantenimiento}</td>
                                               <td>${(inventarioI - demandaDiaria) < 0 ? costoDeficid: 0}</td>`;
            if (politica == "politica1") {
                
                fila.innerHTML += `
                                   <td>${dia%8 === 0 ? pedir = "Si" : pedir = "No" }</td>
                                   <td>${dia%8 === 0 ? cantidadPedido=30 - (inventarioF):0}</td>
                                   <td>${dia%8 === 0 ? tiempoEntrega = generarTiempoEntrega(3):0}</td>
                                   <td>${dia%8 ===0 ? costoPedido: 0}</td>
                                   <td>${dia%8 ===0 ? costoTotalDia=costMantenimiento+costoPedido:costoTotalDia=costMantenimiento+costoDeficid}</td>`; 
                costoTotal+=costoTotalDia;   

                if (tiempoEntrega === 0) {
                    inventarioI = cantidadPedido + (inventarioF);
                } else {
                    inventarioI = inventarioF;
                }

               
            }else{
                fila.innerHTML += `
                                   <td>${inventarioF<=10 && cantidadPedido == 0 ?pedir = "Si" : pedir = "No"}</td>
                                   <td>${inventarioF<=10 && cantidadPedido == 0 ? cantidadPedido = 30 - (inventarioF):0}</td>
                                   <td>${inventarioF<=10 && pedir === "Si" ? tiempoEntrega = generarTiempoEntrega(3):0}</td>
                                   <td>${inventarioF<=10 && pedir === "Si" ? costoPedido: 0}</td>
                                   <td>${inventarioF<=10 && pedir === "Si"  ? costoTotalDia=costMantenimiento+costoPedido:costoTotalDia=costMantenimiento+costoDeficid}</td>`;
                costoTotal+=costoTotalDia;   
                                   
                if (tiempoEntrega === 0) {
                    inventarioI = cantidadPedido + (inventarioF);
                    cantidadPedido = 0;
                } else {
                    inventarioI = inventarioF;
                }
            }

            tablaResultados.appendChild(fila);

            console.log("dia: "+dia);

            dia++;
            tiempoEntrega--;
            setTimeout(avanzarDia, 500);
        }
       
        total.innerHTML = `${"Costo Total: "+costoTotal+"bs"}`;
        document.getElementById("resultados").appendChild(total);    }

    avanzarDia();
    
}

iniciarSimulacion();


