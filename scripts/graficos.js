function graficos(datos,tipo,costosTotales){

    document.getElementById("mostrarGraficoBtn").addEventListener("click", function() {
        // Crea el gráfico en función de los datos almacenados en datosGrafico
        if(tipo === "pie"){
        var penultimo = costosTotales[costosTotales.length - 2];
        datos.datasets[0].data.push(penultimo);
        datos.datasets[0].data.push(costosTotales.pop());
        }
         var ctx = document.getElementById('miGrafico').getContext('2d');
        new Chart(ctx, {
            type: tipo,
            data: datos,
        });
        // Puedes agregar más configuraciones según tus necesidades
        console.log(costosTotales);
    });

}