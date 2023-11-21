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
            
            // Añade el penúltimo elemento y el último elemento de costosTotales a los datos del gráfico.
            datos.datasets[0].data.push(penultimo);
            datos.datasets[0].data.push(costosTotales.pop());
        }

        // Obtiene el contexto del gráfico en el elemento con id "miGrafico".
        var ctx = document.getElementById('miGrafico').getContext('2d');
        
        // Crea un nuevo gráfico utilizando la biblioteca Chart.js.
        new Chart(ctx, {
            type: tipo,  // Tipo de gráfico especificado en el parámetro.
            data: datos,  // Datos del gráfico especificados en el parámetro.
        });


        // Imprime en la consola la lista de costosTotales.
        console.log(costosTotales);
    });
}
