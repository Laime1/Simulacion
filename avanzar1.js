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
    var duracion = parseInt(document.getElementById("duracion").value);
    var politica = document.getElementById("politica").value;
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

    function avanzarDia() {
        if (dia <= duracion) {
            var demandaDiaria = generarDemandaBinomial(6, 0.5);
            var fila = document.createElement("tr");
            fila.innerHTML = `<td>${dia}</td>
                             <td>${inventarioI}</td>
                             <td>${demandaDiaria}</td>`;

            
            if (politica == "politica1") {
                if ((inventarioI - demandaDiaria) < 0) {
                    inventarioF=0;
                    deficid = Math.abs(inventarioI - demandaDiaria);
                     costoDeficid = deficid*10;
                     
                    fila.innerHTML += `<td>0</td>
                                       <td>${deficid}</td>`;
                } else {
                    inventarioF=inventarioI - demandaDiaria;
                    fila.innerHTML += `<td>${inventarioF}</td>
                                       <td>0</td>`;
                }
                costMantenimiento = inventarioF*1;
                
                fila.innerHTML += `<td>${costMantenimiento}</td>
                                   <td>${(inventarioI - demandaDiaria) < 0 ? costoDeficid: 0}</td>
                                   <td>${dia%8 === 0 ? "Sí" : "No"}</td>
                                   <td>${dia%8 === 0 ? cantidadPedido=30 - (inventarioF):0}</td>
                                   <td>${dia%8 === 0 ? tiempoEntrega = generarTiempoEntrega(3):0}</td>
                                   <td>${dia%8 ===0 ? costoPedido: 0}
                                   <td>${dia%8 ===0 ? costMantenimiento+costoPedido:costMantenimiento+costoDeficid}`;

                                   
                if (tiempoEntrega === 0) {
                    inventarioI = cantidadPedido + (inventarioF);
                } else {
                    inventarioI = inventarioF;
                }

               
            }

            tablaResultados.appendChild(fila);

            console.log("dia: "+dia);

            dia++;
            tiempoEntrega--;
            setTimeout(avanzarDia, 1000);
        }
    }

    avanzarDia();
}

document.getElementById("simulacion-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Limpia la tabla de resultados antes de iniciar una nueva simulación
    var tablaResultados = document.querySelector("#resultados table tbody");
    tablaResultados.innerHTML = "";

    iniciarSimulacion();
});

