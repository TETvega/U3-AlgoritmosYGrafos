// botones
const btnCopiarLinalUnica = document.getElementById("btn_CopiarLinealUnica")
const btnLimpiar = document.getElementById('btn_limpiar');

// Función para determinar si el objetivo existe en una matriz ordenada `A` o no
// usando un algoritmo de búsqueda por interpolación
function busquedaInterpolada(arreglo, numeroBuscado) {
    // Base case
    if (arreglo.length === 0) {
      return -1;
    }
// El espacio de búsqueda es A[bajo...alto]
    let limiteInferior = 0;
    let limiteSuperior = arreglo.length - 1;
    let mid;
  
    while (arreglo[limiteSuperior] !== arreglo[limiteInferior] && numeroBuscado >= arreglo[limiteInferior] && numeroBuscado <= arreglo[limiteSuperior]) {

      // Estimar la mitad usando la fórmula de interpolación
      mid = limiteInferior + Math.floor(((numeroBuscado - arreglo[limiteInferior]) * (limiteSuperior - limiteInferior)) / (arreglo[limiteSuperior] - arreglo[limiteInferior]));
  
      // Se encuentra el valor objetivo
      if (numeroBuscado === arreglo[mid]) {
        return mid;
      }
  
      // Descarta todos los elementos en el espacio de búsqueda derecho, incluido el elemento del medio
      if (numeroBuscado < arreglo[mid]) {
        limiteSuperior = mid - 1;
      } else {
        // Descarta todos los elementos en el espacio de búsqueda de la izquierda, incluido el elemento del medio
        limiteInferior = mid + 1;
      }
    }
  
    // Si el objetivo se encuentra en el índice bajo después del ciclo
    if (numeroBuscado === arreglo[limiteInferior]) {
      return limiteInferior;
    }
  
    // El objetivo no existe en la matriz
    return -1;
  }
  

  document.addEventListener("DOMContentLoaded", function() {
    const btnBuscar = document.getElementById("btn_buscar");

    btnBuscar.addEventListener("click", function() {
        const numeroBuscado = parseInt(document.getElementById("numero_Buscado").value);
        const listaNumeros = document.getElementById("lista_Numeros").value.split(",").map(item => parseInt(item.trim()));

        const resultado = busquedaInterpolada(listaNumeros, numeroBuscado);
        const resultadoInterpolada = document.getElementById("ResultadoInterpolada");

        if (resultado !== -1) {
            resultadoInterpolada.textContent = `El elemento ${numeroBuscado} se encuentra en el índice ${resultado}.`;
        } else {
            resultadoInterpolada.textContent =` El elemento ${numeroBuscado} no se encontró en la lista.`;
        }
        return;
    });
});

btnLimpiar.addEventListener('click' , limpiarTextos)

function limpiarTextos(e) {
    e.preventDefault()
    // console.log('Adiso');

    numero_Buscado.value = ""
    lista_Numeros.value = ""
}
// Funcion para mandar codigo al portapapeles 

function copiarUnica(e) {
  e.preventDefault()

  const codigo = document.getElementById("codigoBusquedaUnica").textContent
  navigator.clipboard.writeText(codigo)
  // console.log(codigo);
  alert('Codigo copiado al Portapapeles')  
}
  