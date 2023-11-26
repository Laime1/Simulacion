// Esta función genera la demanda diaria utilizando la distribución binomial.
// Recibe dos parámetros: n (número de ensayos) y p (probabilidad de éxito).
function generarDemandaBinomial(n, p) {
    // Inicializando la probabilidad de éxito.
    const probabilidadExito = p;
    // Inicializando la demanda diaria.
    let demandaDiaria = 0;
    // Bucle que realiza n ensayos.
    for (let i = 0; i < n; i++) {
        // Genera un número aleatorio entre 0 y 1.
        const numeroAleatorio = Math.random();
        // Si el número aleatorio es menor que la probabilidad de éxito, se incrementa la demanda.
        if (numeroAleatorio < probabilidadExito) {
            // Incrementando la demanda diaria.
            demandaDiaria++;
        }
    }
    // Retorna la demanda diaria generada.
    return demandaDiaria;
}
