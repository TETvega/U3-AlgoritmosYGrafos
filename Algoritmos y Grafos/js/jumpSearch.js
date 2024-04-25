const btnCopiarLinalUnica = document.getElementById("btn_CopiarLinealUnica")

function busquedaPorSaltos(lista, elementoBuscado) {

    const numero = lista.length;
    let paso = Math.floor(Math.sqrt(numero));// Tamaño del salto inicial
    console.log(paso);
    let previo = 0;

    // Realiza saltos en la lista
    while (lista[Math.min(paso, numero) - 1] < elementoBuscado) {
        previo = paso;
        paso += Math.floor(Math.sqrt(numero));
        if (previo >= numero) {
            return -1; // El elemento no está en la lista
        }
    }

    // Realiza una búsqueda lineal en la sublista
    while (lista[previo] < elementoBuscado) {
        previo++;
        if (previo === Math.min(paso, n)) {
            return -1; // El elemento no está en la lista
        }
    }

    // Si encuentra el elemento, retornamos el índice
    if (lista[previo] === elementoBuscado) {
        return previo;
    }

    return -1; // El elemento no está en la lista
}
// Funcion para mandar codigo al portapapeles 

    function copiarUnica(e) {
        e.preventDefault()
    
        const codigo = document.getElementById("codigoBusquedaUnica").textContent
        navigator.clipboard.writeText(codigo)
        // console.log(codigo);
        alert('Codigo copiado al Portapapeles')  
    }
    btnCopiarLinalUnica.addEventListener('click' , copiarUnica)


document.addEventListener("DOMContentLoaded", function() {
    const btnBuscar = document.getElementById("btn_buscar");

    btnBuscar.addEventListener("click", function() {
        const numeroBuscado = parseInt(document.getElementById("numero_Buscado").value);
        const listaNumeros = document.getElementById("lista_Numeros").value.split(",").map(item => parseInt(item.trim()));

        const resultado = busquedaPorSaltos(listaNumeros, numeroBuscado);
        const resultadoLineal = document.getElementById("ResultadoLineal");

        if (resultado !== -1) {
            resultadoLineal.textContent = `El elemento ${numeroBuscado} se encuentra en el índice ${resultado}.`;
        } else {
            resultadoLineal.textContent =` El elemento ${numeroBuscado} no se encontró en la lista.`;
        }
    });
});