function iniciarSimulacion() {
    // ... tu código existente ...

    var datosGrafico = {
        labels: [],  // Aquí puedes poner etiquetas como 'Día 1', 'Día 2', etc.
        datasets: [{
            label: 'Costo Total',
            data: [],  // Aquí debes poner los costos totales de cada día
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    function avanzarDia() {
        // ... tu código existente ...

        // Añadir datos para el gráfico
        datosGrafico.labels.push(`Día ${dia}`);
        datosGrafico.datasets[0].data.push(costoTotal);

        // Resto del código...
    }

    avanzarDia();

    // Al finalizar la simulación, crear el gráfico
    var ctx = document.getElementById('miGrafico').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: datosGrafico,
    });
}
