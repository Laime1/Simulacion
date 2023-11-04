function generarTiempoEntrega(lambda) {
    const random = Math.random();
    let tiempo = 0;
    let probabilidadAcumulada = Math.exp(-lambda);

    while (random > probabilidadAcumulada) {
        tiempo++;
        probabilidadAcumulada += Math.exp(-lambda) * Math.pow(lambda, tiempo) / factorial(tiempo);
    }

    return tiempo; // El tiempo de entrega en días
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
