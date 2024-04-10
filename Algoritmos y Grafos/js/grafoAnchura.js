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

// Ejemplo de uso
let grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B'],
    'F': ['C']
};

console.log("Recorrido en Profundidad:");
dfs(grafo, 'D'); // Comienza el recorrido desde el nodo 'D'