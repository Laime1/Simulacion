// Esta función genera un tiempo de entrega utilizando una distribución de Poisson.
// Recibe un parámetro lambda que es la tasa promedio de ocurrencia del evento por unidad de tiempo.
function generarTiempoEntrega(lambda) {
    // Genera un número aleatorio entre 0 y 1.
    const random = Math.random();
    // Inicializa el tiempo de entrega.
    let tiempo = 0;
    // Calcula la probabilidad acumulada para el tiempo de entrega utilizando la distribución de Poisson.
    let probabilidadAcumulada = Math.exp(-lambda);
    // Bucle que continúa hasta que el número aleatorio es menor o igual a la probabilidad acumulada.
    while (random > probabilidadAcumulada) {
        // Incrementa el tiempo de entrega.
        tiempo++;
        // Actualiza la probabilidad acumulada utilizando la fórmula de la distribución de Poisson.
        probabilidadAcumulada += Math.exp(-lambda) * Math.pow(lambda, tiempo) / factorial(tiempo);
    }
    // Retorna el tiempo de entrega en días.
    return tiempo;
}

// Función recursiva para calcular el factorial de un número.
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
