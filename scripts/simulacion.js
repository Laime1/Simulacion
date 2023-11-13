
let politica = ""; //variable de la politica
let duracion = 0;  //variable de la duracion en dias



function generarDemandaBinomial(n, p) {  //funcion que genera la demanda diaria que recive como parametros al numero de ensayos y a la probabilidad
    const probabilidadExito = p;  //Inicializando la probabilidad
    let demandaDiaria = 0;  //Inicializando la demanda

    for (let i = 0; i < n; i++) {       //bucle 
        const numeroAleatorio = Math.random();  //un numero aleaorio
        if (numeroAleatorio < probabilidadExito) {  //si el numero aleatorio generado es menor a la probabilidad, añadimos a la demanda
            demandaDiaria++;  // calculando la demanda
        }
    }
    return demandaDiaria;  //retornamos la demanda
}

function generarTiempoEntrega(lambda) {  //Funcion que genera el tiempo de entrega
    const random = Math.random();  //generamos un numero aleatorio
    let tiempo = 0;  //Inicializando el tiempo medido en dias
    let probabilidadAcumulada = Math.exp(-lambda);  //inicializamos la demanda

    while (random > probabilidadAcumulada) {  //si el numero aleatorio generado es mayor a la probabilidad
        tiempo++;    //añadimos un dia al tiempo
        probabilidadAcumulada += Math.exp(-lambda) * Math.pow(lambda, tiempo) / factorial(tiempo);//en cada iteracion se calcula la probabilidad acumulada
    }

    return tiempo; // El tiempo de entrega en días
}

function factorial(n) {  //funcion que calcula el factorial de un numero
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function iniciarSimulacion() {
    const urlParams = new URLSearchParams(window.location.search); //extraemos la url para sacar los datos que se enviaron por el metodo get
    politica = urlParams.get("politica"); //La politica que son extraidos del formulario
    duracion = urlParams.get("duracion");  //En este caso serian los dias de duracion que son extraidos del formulario


    var tablaResultados = document.querySelector("#resultados table tbody"); 
 
    var dia = 1;   //inicializando los dias en 1
    var inventarioI = 30; //inicializando el inventario inicial
    var inventarioF=0; //inicializando  el inventario Final
    var costMantenimiento = 1; //inicializando el costo de mantenimiento
    var tiempoEntrega = -1; //inicializando el tiempo de Entrega
    var cantidadPedido = 0;//inicializando  la cantidad de pedido
    var costoPedido = 50; //inicializando el costo de pedido
    var costoDeficid = 10; //inicializando el costo de deficid
    var deficid = 0; //inicializando  el deficid
    var pedir = "No"; //variable para ver si se pide o no el pedidido
    var costoTotalDia = 0; //variable que nos mostrara el costo total de cada dia
    var costoTotal = 0; //variable que nos mostrara el costo total de todos los dias 
    var total = document.createElement("label");  //variable que nos permite crear el  label para mostrar el costo total en la vista 


    function avanzarDia() {  //Funcion que nos permite generar cada fila de cada dia de la tabla
        if (dia <= duracion) {  //si el dia es menor que la duracion entonces se sigue generando otra fila
            var demandaDiaria = generarDemandaBinomial(6, 0.5); //nos genera la demanda del dia segun la funcion generarDemandaBinomial(6, 0.5)
            var fila = document.createElement("tr");  //variable que nos permite crear una fila en la tabla para mostrar  en la vista 
            fila.innerHTML = `<td>${dia}</td>    
                             <td>${inventarioI}</td>
                             <td>${demandaDiaria}</td>`; //Se nos muestra el dia el inventario inical y la demanda diaria de cada dia

                             if ((inventarioI - demandaDiaria) < 0) {  //Si el inventario final es menor a 0 no se puede mostrar en la tabla
                                inventarioF=0;  //se mostrara 0 si es menor a 0
                                deficid = Math.abs(inventarioI - demandaDiaria);  //se sacara el valor absoluto del inventario final y se anotara en deficid
                                 costoDeficid = deficid*10; //se calcula el costo de deficid
                                 
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
            if (politica == "politica1") { //si en el formulario se eligio la politica 1 se calculara lo siguiente
                
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


