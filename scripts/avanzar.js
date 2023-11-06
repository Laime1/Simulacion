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
    var diaInput = document.getElementById("Dia");
    var demandaInput = document.getElementById("Demanda");
    var inventarioIInput=document.getElementById("Inventarioi");
    var inventarioFInput = document.getElementById("InventarioF");
    var mantenimientoInput = document.getElementById("Mantenimiento");
    var pedirInput = document.getElementById("Pedir");
    var cantPedidoInput = document.getElementById("CantPedido");
    var tiempoEntregaInput = document.getElementById("Entrega");
    var faltanteInput = document.getElementById("Faltante");

    var cantidadPedido = 0;
    var dia = 1;
    var inventarioI=30;
    var costMantenimiento=1;
    var tiempoEntrega=-1;

    function avanzarDia() {
        if (dia <= duracion) {
            diaInput.value = dia;  //se muestra cada dia
            var demandaDiaria = generarDemandaBinomial(6, 0.5); //funcion que genera la demanda diaria
            demandaInput.value = demandaDiaria;   //se muestra la demanda diaria

            if(politica=="politica1" ){
               
            inventarioIInput.value = inventarioI;   //inventario inicial del dia

             if((inventarioI-demandaDiaria)<0){
                inventarioFInput.value = 0;
                faltanteInput.value = Math.abs(inventarioI-demandaDiaria);
             }else{  
                inventarioFInput.value = inventarioIInput.value - demandaInput.value; //inventario final del dia
                faltanteInput.value = 0;
             }
             mantenimientoInput.value = inventarioFInput.value*costMantenimiento;  //costo de mantenimiento diario
             pedirInput.value = "no";
             
             if(tiempoEntrega===0){
                inventarioI = parseInt(cantidadPedido)+parseInt(inventarioFInput.value);
             }else{
                inventarioI=inventarioFInput.value;
             }


             if(dia%8==0){
                pedirInput.value = "si";
                cantidadPedido =(30 - inventarioFInput.value);
                cantPedidoInput.value = cantidadPedido;
                tiempoEntrega = generarTiempoEntrega(3);
                tiempoEntregaInput.value = tiempoEntrega;
             }

            

            }
            console.log("Día: " + dia);
            //console.log("Inventario inicial: " + inventarioI);
           
            console.log("Inventario inicial input: " + inventarioIInput.value);
            console.log("Demanda: "+demandaDiaria)
            console.log("invetario final: "+inventarioFInput.value);
            console.log("cantidad de pedido: " + cantidadPedido);
            console.log("Tiempo de entrega: "+tiempoEntrega)
            tiempoEntrega--;
            dia++; //el dia se cumula para mostrarse cada dia
            setTimeout(avanzarDia, 1000);
        }
        

    }

    avanzarDia();
}

document.getElementById("simulacion-form").addEventListener("submit", function (event) {
    event.preventDefault();
    iniciarSimulacion();
});