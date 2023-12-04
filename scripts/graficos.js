// Esta función se encarga de generar gráficos en una página HTML.
// Recibe tres parámetros: datos (información para el gráfico), tipo (tipo de gráfico, por ejemplo, "pie" para gráfico circular),
// y costosTotales (una lista de costos totales, utilizado para ciertas configuraciones específicas).
function graficos(datos, tipo, costosTotales) {
    // Agrega un evento al botón con el id "mostrarGraficoBtn".
    document.getElementById("mostrarGraficoBtn").addEventListener("click", function() {
        
        // Si el tipo de gráfico es "pie", realiza ciertas operaciones específicas.
        if (tipo === "pie") {
            // Obtiene el penúltimo elemento de costosTotales.
            var penultimo = costosTotales[costosTotales.length - 2];
            var ctx2 = document.getElementById('miGrafico2').getContext('2d');

            // Añade el penúltimo elemento y el último elemento de costosTotales a los datos del gráfico.
            datos.datasets[0].data.push(penultimo);
            datos.datasets[0].data.push(costosTotales.pop());

            document.getElementById("totales1").innerHTML = "El Costo total de la politica 1 es: "+ datos.datasets[0].data[0]+" Bs";
            document.getElementById("totales2").innerHTML = "El Costo total de la politica 2 es: "+ datos.datasets[0].data[1]+" Bs";

            if(datos.datasets[0].data[0]>=datos.datasets[0].data[1]){
                document.getElementById("totales").innerHTML = "Politica 2 es la mas económica";
            }else{
                document.getElementById("totales").innerHTML = "Politica 1 es la mas económica";
            }

            new Chart(ctx2, {
                type: tipo,  // Tipo de gráfico especificado en el parámetro.
                data: datos,  // Datos del gráfico especificados en el parámetro.
                options: {
                    responsive: false, // Evita que el gráfico se ajuste automáticamente al contenedor
                    animation: {
                        animateRotate: true,
                        animateScale: false,
                      }, }
            });
            
            console.log(datos.datasets[0].data[0]);
            console.log(datos.datasets[0].data[1]);


        }else if(tipo === "gra"){

            var ctx = document.getElementById('miGrafico').getContext('2d');
            var ctx1 = document.getElementById('miGrafico1').getContext('2d');
            var costoMantenimieto1 = costosTotales[costosTotales.length - 3];
            var costoDeficit1 = costosTotales[costosTotales.length - 2];
            
            document.getElementById('graficos').style.display = 'block';

            // Añade el penúltimo elemento y el último elemento de costosTotales a los datos del gráfico.
            datos.datasets[0].data.push(costoMantenimieto1);
            datos.datasets[0].data.push(costoDeficit1);
            datos.datasets[0].data.push(costosTotales.pop());
            tipo = "pie";

            document.getElementById("costos2").innerHTML = "Costo de mantenimiento: "+costoMantenimieto1+" Bs";
            document.getElementById("costos21").innerHTML = "Costo de deficít: "+costoDeficit1+" Bs";
            document.getElementById("costos22").innerHTML = "Costo de Pedido: "+datos.datasets[0].data[2]+" Bs";


            new Chart(ctx1, {
                type: tipo,  // Tipo de gráfico especificado en el parámetro.
                data: datos,  // Datos del gráfico especificados en el parámetro.
                options: {
                    responsive: false, // Evita que el gráfico se ajuste automáticamente al contenedor
                    animation: {
                        animateRotate: true,
                        animateScale: false,
                      }, }
            });

            console.log(costosTotales);

        datos.datasets[0].data = [];
        costosTotales.splice(costosTotales.length - 2, 3);
        var costoMantenimieto = costosTotales[costosTotales.length - 3];
        var costoDeficit = costosTotales[costosTotales.length - 2];

        datos.datasets[0].data.push(costoMantenimieto);
        datos.datasets[0].data.push(costoDeficit);
        datos.datasets[0].data.push(costosTotales.pop());

        document.getElementById("costos1").innerHTML = "Costo de mantenimiento: "+costoMantenimieto+" Bs";
        document.getElementById("costos11").innerHTML = "Costo de deficít: "+costoDeficit+" Bs";
        document.getElementById("costos12").innerHTML = "Costo de Pedido: "+datos.datasets[0].data[2]+" Bs";

        new Chart(ctx, {
            type: tipo,  // Tipo de gráfico especificado en el parámetro.
            data: datos,  // Datos del gráfico especificados en el parámetro.
            options: {
                responsive: false, // Evita que el gráfico se ajuste automáticamente al contenedor
                animation: {
                    animateRotate: true,
                    animateScale: false,
                  }, }
        });
        console.log(costosTotales);

        }else{
            var ctx = document.getElementById('miGrafico').getContext('2d');
            var costoMantenimieto1 = costosTotales[costosTotales.length - 3];
            var costoDeficit1 = costosTotales[costosTotales.length - 2];

            document.getElementById('graficos').style.display = 'block';
            document.getElementById('grafica2').style.display = 'none';
            document.getElementById('grafica3').style.display = 'none';



            // Añade el penúltimo elemento y el último elemento de costosTotales a los datos del gráfico.
            datos.datasets[0].data.push(costoMantenimieto1);
            datos.datasets[0].data.push(costoDeficit1);
            datos.datasets[0].data.push(costosTotales.pop());
            tipo = "pie";

         document.getElementById("costos1").innerHTML = "Costo de mantenimiento: "+costoMantenimieto1+" Bs";
        document.getElementById("costos11").innerHTML = "Costo de deficít: "+costoDeficit1+" Bs";
        document.getElementById("costos12").innerHTML = "Costo de Pedido: "+datos.datasets[0].data[2]+" Bs";
            
        new Chart(ctx, {
                type: tipo,  // Tipo de gráfico especificado en el parámetro.
                data: datos,  // Datos del gráfico especificados en el parámetro.
                options: {
                    responsive: false, // Evita que el gráfico se ajuste automáticamente al contenedor
                    animation: {
                        animateRotate: true,
                        animateScale: false,
                      }, }
            });

            console.log(costosTotales);
        }

        // Obtiene el contexto del gráfico en el elemento con id "miGrafico".
        
        // Crea un nuevo gráfico utilizando la biblioteca Chart.js.
        
    


        // Imprime en la consola la lista de costosTotales.
    });
}
