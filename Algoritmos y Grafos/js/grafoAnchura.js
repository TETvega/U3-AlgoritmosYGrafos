function bfs(grafo, vInicial) {
    let visitados = {}; // Objeto para almacenar los nodos visitados
    let cola = [vInicial]; // Cola para el recorrido en anchura

    // Mientras haya nodos en la cola
    while (cola.length > 0) {
        // Sacamos el primer nodo de la cola
        let verticeActual = cola[0];
        cola = cola.slice(1); // Eliminamos el primer elemento de la cola
        // Si el nodo actual no ha sido visitado
        if (!visitados[verticeActual]) {
            // Marcamos el nodo como visitado
            visitados[verticeActual] = true;
            // Mostramos el nodo actual o realizamos alguna operación con él
            console.log(verticeActual);
            // Obtenemos los nodos adyacentes al nodo actual
            let adyacentes = grafo[verticeActual];
            // Agregamos los nodos adyacentes a la cola (si no han sido visitados)
            adyacentes.forEach(adyacente => {
                if (!visitados[adyacente]) {
                    cola.push(adyacente);
                }
            });
        }
    }
}

function dfs(grafo, vInicial, visitados = {}) {
    // Marcamos el nodo actual como visitado
    visitados[vInicial] = true;
    // Mostramos el nodo actual o realizamos alguna operación con él
    console.log(vInicial);
    // Obtenemos los nodos adyacentes al nodo actual
    let adyacentes = grafo[vInicial];
    // Recorremos los nodos adyacentes
    adyacentes.forEach(adyacente => {
        // Si el nodo adyacente no ha sido visitado
        if (!visitados[adyacente]) {
            // Realizamos una llamada recursiva a dfs con el nodo adyacente como nuevo nodo inicial
            dfs(grafo, adyacente, visitados);
        }
    });
}



// function dfs(grafo, vInicial) {
//     let visitados = {}; // Objeto para almacenar los nodos visitados
//     let pila = [vInicial]; // Pila para el recorrido en profundidad

//     // Mientras haya nodos en la pila
//     while (pila.length > 0) {
//         // Sacamos el último nodo de la pila
//         let verticeActual = pila.pop();
//         // Si el nodo actual no ha sido visitado
//         if (!visitados[verticeActual]) {
//             // Marcamos el nodo como visitado
//             visitados[verticeActual] = true;
//             // Mostramos el nodo actual o realizamos alguna operación con él
//             console.log(verticeActual);
//             // Obtenemos los nodos adyacentes al nodo actual
//             let adyacentes = grafo[verticeActual];
//             // Agregamos los nodos adyacentes a la pila (si no han sido visitados)
//             adyacentes.forEach(adyacente => {
//                 if (!visitados[adyacente]) {
//                     pila.push(adyacente);
//                 }
//             });
//         }
//     }
// }

// Ejemplo de uso
let grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B'],
    'F': ['C']
};

console.log("Recorrido en Anchura:");

bfs(grafo, 'D'); // Comienza el recorrido desde el nodo 'D'

console.log("Recorrido en Profundidad:");
dfs(grafo, 'D');
