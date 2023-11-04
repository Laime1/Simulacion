function generarDemandaBinomial(n, p) {
    // Generar un número aleatorio entre 0 y 1 para cada día
    const probabilidadExito = p;
    let demandaDiaria = 0;

    for (let i = 0; i < n; i++) {
        const numeroAleatorio = Math.random();
        if (numeroAleatorio < probabilidadExito) {
            demandaDiaria++;
        }
    }
    return demandaDiaria;
}
