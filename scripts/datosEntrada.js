
function datos(urlParams){
    var politica = urlParams.get("politica");
    var duracion = urlParams.get("duracion");
    var inventario = urlParams.get("inventario");
    var costoM = urlParams.get("costoM");
    var costoD = urlParams.get("costoD");
    var costoP = urlParams.get("costoP");

    var datosObj = {
        politica: politica,
        duracion: duracion,
        inventario: inventario,
        costoM: costoM,
        costoD: costoD,
        costoP: costoP
    };
    return datosObj
}