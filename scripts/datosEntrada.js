// Esta función toma un objeto urlParams que se espera contenga parámetros de la URL.
function datos(urlParams) {
    // Obtiene el valor del parámetro "politica" de urlParams.
    var politica = urlParams.get("politica");
    
    // Obtiene el valor del parámetro "duracion" de urlParams.
    var duracion = urlParams.get("duracion");
    
    // Obtiene el valor del parámetro "inventario" de urlParams.
    var inventario = urlParams.get("inventario");
    
    // Obtiene el valor del parámetro "costoM" de urlParams.
    var costoM = urlParams.get("costoM");
    
    // Obtiene el valor del parámetro "costoD" de urlParams.
    var costoD = urlParams.get("costoD");
    
    // Obtiene el valor del parámetro "costoP" de urlParams.
    var costoP = urlParams.get("costoP");

    // Crea un objeto llamado datosObj con las propiedades obtenidas de los parámetros de la URL.
    var datosObj = {
        politica: politica,
        duracion: duracion,
        inventario: inventario,
        costoM: costoM,
        costoD: costoD,
        costoP: costoP
    };

    // Devuelve el objeto creado con los datos.
    return datosObj;
}
