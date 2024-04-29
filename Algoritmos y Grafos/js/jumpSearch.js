// Botones
const btnCopiarLinalUnica = document.getElementById("btn_CopiarLinealUnica")
const btnLimpiar = document.getElementById('btn_limpiar');

function busquedaPorSaltos(lista, elementoBuscado) {

    const numero = lista.length;
    let paso = Math.floor(Math.sqrt(numero));// Tamaño del salto inicial
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
        if (previo === Math.min(paso, numero)) {
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
    btnLimpiar.addEventListener('click' , limpiarTextos)

    function limpiarTextos(e) {
        e.preventDefault()
        // console.log('Adiso');
    
        numero_Buscado.value = ""
        lista_Numeros.value = ""
    }
    

document.addEventListener("DOMContentLoaded", function() {
    const btnBuscar = document.getElementById("btn_buscar");

    btnBuscar.addEventListener("click", function() {
        const numeroBuscado = parseInt(document.getElementById("numero_Buscado").value);
        const listaNumeros = document.getElementById("lista_Numeros").value.split(",").map(item => parseInt(item.trim()));

        const resultado = busquedaPorSaltos(listaNumeros, numeroBuscado);
        const resultadoSaltos = document.getElementById("ResultadoSaltos");

        if (resultado !== -1) {
            resultadoSaltos.textContent = `El elemento ${numeroBuscado} se encuentra en el índice ${resultado}.`;
        } else {
            resultadoSaltos.textContent =` El elemento ${numeroBuscado} no se encontró en la lista.`;
        }
        return;
    });
});