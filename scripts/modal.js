// Obtén el modal y el encabezado para mostrar el modal
var modal = document.getElementById("miModal");

var explicacion = document.getElementById("explicacion");
var demanda = document.getElementById("demanda");
var final = document.getElementById("final");
var faltante = document.getElementById("faltante");

// Función para mostrar el modal al pasar el mouse sobre el encabezado
function mostrarModal(encabezado) {
    modal.style.display = "block";

    // Actualiza la descripción según el encabezado
    switch (encabezado) {
        case "inicial":
            explicacion.innerText = "La cantidad de productos que estan en el inventario al empezar el día.";
            break;
        case "demanda":
            explicacion.innerText = "La cantidad de producto que se esperan compren los clientes cada día.";
            break;
        case "final":
            explicacion.innerText = "La cantidad de productos que quedan en inventario al final del día.";
            break;
        case "faltante":
            explicacion.innerText = "La cantidad de productos que no pudieron ser satisfechos debido a la falta de inventario.";
            break;
        case "mantenimiento":
            explicacion.innerText = "El costo asociado al mantenimiento y almacenamiento de productos en inventario.";
            break;
        case "deficit":
            explicacion.innerText = "El costo adicional incurrido cuando no hay suficiente inventario para satisfacer la demanda.";
            break;
        case "pedir":
            explicacion.innerText = "La decisión de si es necesario realizar un pedido de inventario basado en ciertos criterios.";
            break;
        case "cantidad":
            explicacion.innerText = "La cantidad de productos que se solicitará en un pedido de inventario.";
            break;
        case "entrega":
            explicacion.innerText = "El tiempo estimado que tomará recibir un pedido de inventario.";
            break;
        case "pedido":
            explicacion.innerText = "El costo asociado al proceso de realizar un pedido de inventario.";
            break;
        case "total":
            explicacion.innerText = "El costo total del día, que incluye todos los costos asociados con el manejo de inventario.";
            break;
    }
    
}

// Función para cerrar el modal al retirar el mouse del encabezado
function cerrarModal() {
    modal.style.display = "none";
}
