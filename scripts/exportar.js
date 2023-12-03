function exportarExcel() {
    // Obtener datos de ambas tablas
    var datosPolitica1 = obtenerDatosTabla('politica1');
    var datosPolitica2 = obtenerDatosTabla('politica2');

    // Crear un libro de Excel
    var workbook = XLSX.utils.book_new();

    // Verificar si hay datos en la política 1 y agregar hoja si es necesario
    if (datosPolitica1.length > 1) { // Se verifica si hay más de una fila (excluyendo los encabezados)
        var hojaPolitica1 = XLSX.utils.json_to_sheet(datosPolitica1);
        XLSX.utils.book_append_sheet(workbook, hojaPolitica1, 'POLÍTICA 1');
    }

    // Verificar si hay datos en la política 2 y agregar hoja si es necesario
    if (datosPolitica2.length > 1) { // Se verifica si hay más de una fila (excluyendo los encabezados)
        var hojaPolitica2 = XLSX.utils.json_to_sheet(datosPolitica2);
        XLSX.utils.book_append_sheet(workbook, hojaPolitica2, 'POLÍTICA 2');
    }

    // Guardar el libro como archivo Excel
    XLSX.writeFile(workbook, 'Datos.xlsx');
}

function obtenerDatosTabla(tablaId) {
    var table = document.getElementById(tablaId);

    // Verificar si la tabla existe y tiene al menos una fila (excluyendo los encabezados)
    if (table && table.rows.length > 1) {
        var rows = Array.from(table.querySelectorAll('tr'));
        return rows.map(row => {
            var cells = Array.from(row.querySelectorAll('th, td'));
            return cells.map(cell => cell.innerText);
        });
    } else {
        return []; // Si no hay datos, devuelve un array vacío
    }
}
