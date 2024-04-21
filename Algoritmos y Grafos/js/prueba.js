let nodoInicial = null; // Almacenar el nodo inicial seleccionado por el usuario
let nodoDestino = null; // Almacenar el nodo destino seleccionado por el usuario

svgGrafo.addEventListener('click', async(e) => {
    if (!nodoInicial) { // Si aún no se ha seleccionado el nodo inicial
        if (e.target.classList.contains('txtnodoSpan')) {
            nodoInicial = e.target.textContent;
            console.log('Nodo inicial seleccionado:', nodoInicial);
            // Cambiar el color del nodo inicial seleccionado
            let circleNodoInicial = document.getElementById(nodoInicial);
            circleNodoInicial.classList.remove('no-visitado');
            circleNodoInicial.classList.add('nodoInicio');
        }
    } else if (!nodoDestino) { // Si ya se seleccionó el nodo inicial pero no el destino
        if (e.target.classList.contains('txtnodoSpan')) {
            nodoDestino = e.target.textContent;
            console.log('Nodo destino seleccionado:', nodoDestino);
            // Cambiar el color del nodo destino seleccionado
            let circleNodoDestino = document.getElementById(nodoDestino);
            circleNodoDestino.classList.remove('no-visitado');
            circleNodoDestino.classList.add('nodoDestino');
            
            // Ejecutar el algoritmo DFS con el nodo inicial y el destino
            await ejecutarDFS(grafo, nodoInicial, nodoDestino);
        }
    }
});


async function ejecutarDFS(grafo, nodoInicial, nodoDestino) {
    let visitados = {}; // Objeto para almacenar los nodos visitados
    let pila = [nodoInicial]; // Pila para el recorrido en profundidad
    
    console.log('*-*-*-Iniciando Recorrido-*-*-*-*');
    
    // Mientras haya nodos en la pila
    while (pila.length > 0) {
        let verticeActual = pila.pop(); // Sacamos el último nodo de la pila
        
        if (!visitados[verticeActual]) { // Si el nodo actual no ha sido visitado
            visitados[verticeActual] = true; // Marcamos el nodo como visitado
            await cambiarColorNodo(verticeActual, '#8EEA7A'); // Cambiamos el color del nodo visitado
            
            if (verticeActual === nodoDestino) { // Verificamos si el nodo actual es el destino
                console.log("Se encontró el nodo de destino:", verticeActual);
                break; // Si se encontró el destino, salimos del bucle
            }
            
            let adyacentes = grafo[verticeActual]; // Obtenemos los nodos adyacentes al nodo actual
            
            adyacentes.forEach(adyacente => { // Agregamos los nodos adyacentes a la pila (si no han sido visitados)
                if (!visitados[adyacente]) {
                    pila.push(adyacente);
                }
            });
        }
        
        await sleep(1000); // Esperamos un segundo antes de continuar con el siguiente nodo
    }
    
    let circleUltimoNodo = document.getElementById(nodoDestino);
    circleUltimoNodo.classList.remove('visitado');
    circleUltimoNodo.classList.remove('circle');
    circleUltimoNodo.style.fill = '#8a2be2';
    circleUltimoNodo.classList.add('nodoFin');
    
    console.log('El último nodo en ser iterado es:', nodoDestino);
}
