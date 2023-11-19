function generarDemandaBinomial(n, p) {  //funcion que genera la demanda diaria que recive como parametros al numero de ensayos y a la probabilidad
    const probabilidadExito = p;  //Inicializando la probabilidad
    let demandaDiaria = 0;  //Inicializando la demanda

    for (let i = 0; i < n; i++) {       //bucle 
        const numeroAleatorio = Math.random();  //un numero aleaorio
        if (numeroAleatorio < probabilidadExito) {  //si el numero aleatorio generado es menor a la probabilidad, añadimos a la demanda
            demandaDiaria++;  // calculando la demanda
        }
    }
    return demandaDiaria;  //retornamos la demanda
}