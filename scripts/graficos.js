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

        datos.datasets[0].data = [];
        costosTotales.splice(costosTotales.length - 2, 3);
        var costoMantenimieto = costosTotales[costosTotales.length - 3];
        var costoDeficit = costosTotales[costosTotales.length - 2];

        datos.datasets[0].data.push(costoMantenimieto);
        datos.datasets[0].data.push(costoDeficit);
        datos.datasets[0].data.push(costosTotales.pop());

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
