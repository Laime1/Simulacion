function iniciarSimulacion(){
    var urlParams = new URLSearchParams(window.location.search);
    var misdatos = datos(urlParams);
    var politica = misdatos.politica;
    var duracion = misdatos.duracion;

    var tablaResultados; 
  


    var dia = 1;//inicializando los dias en 1
    var inventarioI = misdatos.inventario; //inicializando el inventario inicial
    var inventarioF=0; //inicializando  el inventario Final
    var costoM = misdatos.costoM;
    var costMantenimiento = parseInt(costoM); //inicializando el costo de mantenimiento
    var tiempoEntrega = -1; //inicializando el tiempo de Entrega
    var cantidadPedido = 0;//inicializando  la cantidad de pedido
    var costoPedido = parseInt(misdatos.costoP); //inicializando el costo de pedido
    var costoDeficid = misdatos.costoD; //inicializando el costo de deficid
    var deficid = 0; //inicializando  el deficid
    var pedir = "No"; //variable para ver si se pide o no el pedidido
    var costoTotalDia = 0; //variable que nos mostrara el costo total de cada dia
    var costoTotal = 0; //variable que nos mostrara el costo total de todos los dias 
    var total = document.createElement("label");  //variable que nos permite crear el  label para mostrar el costo total en la vista 
    
    function avanzarDia(politica) {  //Funcion que nos permite generar cada fila de cada dia de la tabla
        if (dia <= duracion) {  //si el dia es menor que la duracion entonces se sigue generando otra fila
            var demandaDiaria = generarDemandaBinomial(6, 0.5); //nos genera la demanda del dia segun la funcion generarDemandaBinomial(6, 0.5)
            if(politica== "politica1"){
                tablaResultados = document.querySelector("#resultados table tbody"); 
            }else{
                 tablaResultados = document.querySelector("#resultados2 table tbody"); 
            }
            var fila = document.createElement("tr"); //variable que nos permite crear una fila en la tabla para mostrar  en la vista 
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
                            costMantenimiento = inventarioF*costoM;
                            fila.innerHTML += `<td>${costMantenimiento}</td>
                                               <td>${(inventarioI - demandaDiaria) < 0 ? costoDeficid: 0}</td>`;
            if (politica == "politica1") { //si en el formulario se eligio la politica 1 se calculara lo siguiente
                
                fila.innerHTML += `
                                   <td>${dia%8 === 0 ? pedir = "Si" : pedir = "No" }</td> 
                                   <td>${dia%8 === 0 ? cantidadPedido=30 - (inventarioF):0}</td>
                                   <td>${dia%8 === 0 ? tiempoEntrega = generarTiempoEntrega(3):0}</td>
                                   <td>${dia%8 ===0 ? costoPedido: 0}</td>
                                   <td>${dia%8 ===0 ? costoTotalDia=costMantenimiento+costoPedido:costoTotalDia=costMantenimiento+costoDeficid}</td>`; 
                costoTotal+=costoTotalDia;   //El costo total  acumulado de cada dia

                if (tiempoEntrega === 0) {  //si el tiempo de entrega es igual a cero 
                    inventarioI = cantidadPedido + (inventarioF); // el inventario Inicial se añadira la cantidad de pedido
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

            avanzarDia(politica);
        }
        total.innerHTML = `Costo Total: ${costoTotal}bs`;
        if(politica==="politica1"){
            document.getElementById("resultados").appendChild(total); 
        }else{
            document.getElementById("resultados2").appendChild(total); 
        }
        
      }
      if (politica === "politica3") {
        avanzarDia("politica1");
        avanzarDia("politica2");
    } else {
        avanzarDia(politica);
    }
    
}
iniciarSimulacion();
