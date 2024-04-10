function bfs(grafo, vInicial) {
    let visitados = {}; // Objeto para almacenar los nodos visitados
    let cola = [vInicial]; // Cola para el recorrido en anchura

    // Mientras haya nodos en la cola
    while (cola.length > 0) {
        // Sacamos el primer nodo de lai cola
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