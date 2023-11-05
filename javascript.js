// Función para realizar la simulación
function simularInventarios(politica, duracion) {
    // Inicializar variables y datos de simulación
    let inventario = 0;
    let costoTotal = 0;
    let pedidosRealizados = 0;

    // Datos de demanda y tiempo de entrega (deben definirse)
    const demandaDiaria = [/*  valores de demanda */];
    const tiempoEntrega = [/*  valores de tiempo de entrega */];

    // Simulación de inventarios
    for (let dia = 1; dia <= duracion; dia++) {
        // Restar demanda diaria al inventario
        inventario -= demandaDiaria[dia - 1];

        // Verificar si es necesario realizar un pedido
        if (politica === "politica1" && dia % 8 === 0) {
            const cantidadAOrdenar = 30 - inventario;
            costoTotal += cantidadAOrdenar * 50; // Costo del pedido
            pedidosRealizados++;
            inventario += cantidadAOrdenar;
        } else if (politica === "politica2" && inventario <= 10) {
            const cantidadAOrdenar = 30 - inventario;
            costoTotal += cantidadAOrdenar * 50; // Costo del pedido
            pedidosRealizados++;
            inventario += cantidadAOrdenar;
        }
        
        // Realizar seguimiento de los costos de mantenimiento
        costoTotal += inventario * 1; // Costo de mantenimiento diario
    }

    // Devolver los resultados de la simulación
    return {
        inventarioFinal: inventario,
        costoTotal: costoTotal,
        pedidosRealizados: pedidosRealizados
    };
}

// Manejar el envío del formulario
document.getElementById("simulacion-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const politica = document.getElementById("politica").value;
    const duracion = parseInt(document.getElementById("duracion").value, 10);

    // Realizar la simulación
    const resultados = simularInventarios(politica, duracion);

    // Mostrar los resultados en la página
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = `
        <h3>Resultados de la Simulación</h3>
        <p>Inventario Final: ${resultados.inventarioFinal}</p>
        <p>Costo Total: ${resultados.costoTotal} Bs.</p>
        <p>Pedidos Realizados: ${resultados.pedidosRealizados}</p>
    `;
});
