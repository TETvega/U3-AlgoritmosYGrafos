document.addEventListener('DOMContentLoaded', () => {
    dibujarGrafo();
    let nodosAnteriores = []; // array para almacenar los nodos adyacentes coloreados anteriormente
    let nodoActual = null; // almacenar el nodo actualmente presionado
    // Evento de clic para iniciar el recorrido BFS desde el nodo presionado
    svgGrafo.addEventListener('click', (e) => {
        if (e.target.classList.contains('txtnodoSpan')) {
            let nodoPresionado = e.target.textContent;
            console.log('Se presionó: ', nodoPresionado);
            if (nodoActual) { // Restaurar el color original del nodo anteriormente presionado, si lo hay
                let circleNodoAnterior = document.getElementById(nodoActual);
                circleNodoAnterior.classList.remove('nodoInicio');
                circleNodoAnterior.classList.add('no-visitado');
                
            }
            nodoActual = nodoPresionado
           // Cambiar el color del nodo presionado actualmente
            let circleNodoPresionado = document.getElementById(nodoPresionado);
            circleNodoPresionado.classList.remove('no-visitado');
            circleNodoPresionado.classList.add('nodoInicio');

            // Restaurar el color original de los nodos adyacentes coloreados anteriormente
            // nodosAnteriores.forEach(nodoAnterior => {
            //     let circleAnterior = document.getElementById(nodoAnterior);
            //     circleAnterior.classList.remove('visitado');
            //     circleAnterior.classList.remove('adyacente');
            //     circleAnterior.classList.add('no-visitado');
            // });
        const nodosGrafos = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
            nodosGrafos.forEach(nodo => {
                let circle = document.getElementById(nodo)
                circle.classList.remove('visitado');
                circle.classList.remove('nodoFin')
                circle.classList.add('no-visitado')
                console.log('Añadiendo la clase "no-visitado" a: ',nodo);
            })

            ejecutarBFS(grafo, nodoPresionado);
        }
    });
})

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
// let grafo = {
//     'A': ['B', 'C'],
//     'B': ['A', 'D', 'E'],
//     'C': ['A', 'F'],
//     'D': ['B'],
//     'E': ['B'],
//     'F': ['C']
// };
console.log("Recorrido en Profundidad:");
// dfs(grafo, 'D');

console.log("Recorrido en Anchura:");
// bfs(grafo, 'D'); // Comienza el recorrido desde el nodo 'D'



const svgGrafo = document.getElementById('graphSVG'); // llamar al contenedor svg
    const grafo = { // representar el grafo en lista de adyacencia (en un objeto)
        'A': ['B'],
        'B': ['A', 'D', 'G'],
        'C': ['E', 'F'],
        'D': ['B', 'E', 'F', 'G'],
        'E': ['C', 'D', 'F'],
        'F': ['C', 'D', 'E', 'G'],
        'G': ['B', 'D', 'F']
    };
    
    // Definir las posiciones de los nodos y sus nombres
    const nodes = {
        'A': {x: 169, y: 100},
        'B': {x: 456.3, y: 100},
        'C': {x: 169, y: 300},
        'D': {x: 338, y: 150},
        'E': {x: 84.5, y: 200},
        'F': {x: 676, y: 200},
        'G': {x: 470.3, y: 350}
    };
    
    // Dibujar los nodos
    function dibujarNodos() {
        for (let nodo in nodes) {  
            let coordenadas = nodes[nodo];
            
            // Crear el foreignObject que contendrá el círculo y el texto
            let foreignObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
            foreignObj.setAttribute("x", coordenadas.x - 15); // Ajustar la posición según el tamaño del círculo y el texto
            foreignObj.setAttribute("y", coordenadas.y - 10);
            foreignObj.setAttribute("width", 30); // Ajustar el ancho y el alto según el tamaño del círculo y el texto
            foreignObj.setAttribute("height", 30);
            
            // Crear el contenido dentro del foreignObject
            let content = `
                <div class="d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="border: none;">
                        <circle cx="10" cy="10" r="10" id="${nodo}"/>
                    </svg>
                    <span class="txtnodoSpan" style="position: absolute; top: -3px; cursor: pointer;">${nodo}</span>
                </div>
            `;
            foreignObj.innerHTML = content;
            
            // Agregar el foreignObject al SVG
            svgGrafo.appendChild(foreignObj);
        }
    }
    

    // Dibujar las aristas
    function dibujarAristas() {
        for (let nodo in grafo) {
            let nodosAdyacentes = grafo[nodo]; // obtenemos a los nodos adyacentes al nodo actual
            let puntoInicio = nodes[nodo]; // obtenemos las coordenadas de inicio, del nodo actual del objeto 'nodes' 
            for (let i = 0; i < nodosAdyacentes.length; i++) { //  iteramos sobre cada nodo adyacente del nodo actual
                let puntoFinal = nodes[nodosAdyacentes[i]]; // obtenemos las coordenadas del nodo adyacente actual (punto final de la arista)
                let linea = document.createElementNS("http://www.w3.org/2000/svg", "line"); // crear la linea
                linea.setAttribute("x1", puntoInicio.x); //  añadirle atributos de la línea que se acaba de crear.
                linea.setAttribute("y1", puntoInicio.y); // coordenadas x1 e y1 para el punto de inicio de la línea (startPoint) 
                linea.setAttribute("x2", puntoFinal.x); 
                linea.setAttribute("y2", puntoFinal.y); // coordenadas x2 e y2 para el punto final de la línea (endPoint).
                linea.classList.add('arista')
                svgGrafo.appendChild(linea); // mostrarlo en el html
            }
        }
    }
    
    // Dibujar el grafo
    function dibujarGrafo() {
        dibujarAristas();
        dibujarNodos();
    }

// let nodosAnteriores = []; // array para almacenar los nodos adyacentes coloreados anteriormente
// let nodoActual = null; // almacenar el nodo actualmente presionado
// svgGrafo.addEventListener('click', (e) => {  // seleccionar Nodo
//     e.preventDefault()

//     if (e.target.classList.contains('txtnodoSpan')) 
//     {
//         let adyacentes = [];
//         let nodoPresionado = e.target.textContent; // obtenemos el nombre del nodo

// // si hay un valor (no null) en nodoActual (lo que significa que un nodo ha sido seleccionado previamente), se ejecutará el codigo dentro del  if
//         if (nodoActual) { // Restaurar el color original del nodo anteriormente presionado, si lo hay
//             let circleNodoAnterior = document.getElementById(nodoActual);
//             circleNodoAnterior.classList.remove('nodoInicio');
//             circleNodoAnterior.classList.add('no-visitado');
//         }
//         nodoActual = nodoPresionado; // actualizar el nodo actualmente presionado

//         // Cambiar el color del nodo presionado actualmente
//         let circleNodoPresionado = document.getElementById(nodoPresionado);
//         circleNodoPresionado.classList.remove('no-visitado');
//         circleNodoPresionado.classList.add('nodoInicio');

//         // Restaurar el color original de los nodos adyacentes coloreados anteriormente
//         nodosAnteriores.forEach(nodoAnterior => {
//             let circleAnterior = document.getElementById(nodoAnterior);
//             circleAnterior.classList.remove('adyacente');
//             circleAnterior.classList.add('no-visitado');
//         });
   
//         adyacentes = grafo[nodoPresionado]; // Obtener los nodos adyacentes al nodo seleccionado
//         adyacentes.forEach(nodoAdyacente => { // Colorear los nodos adyacentes al nodo seleccionado
//             let circleAdyacente = document.getElementById(nodoAdyacente);
//             circleAdyacente.classList.remove('no-visitado');
//             circleAdyacente.classList.add('adyacente');
//         });
//         nodosAnteriores = adyacentes.slice(); // pasar adyacentes al array notasAnteriores (se sobreescribe el array)
//     }
// })

// Función para cambiar el color de un nodo en el SVG
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function cambiarColorNodo(nodoId, color) {
    let nodo = document.getElementById(nodoId);
    if (nodo) {
      nodo.classList.remove('no-visitado');
      nodo.classList.add('nodoEnProceso');
      await sleep(800); // Pausa de 1 segundo
      nodo.classList.remove('nodoEnProceso');
      nodo.classList.add('visitado');
      console.log(`Color cambiado para nodo ${nodoId} a ${color}`);
    } else {
      console.error(`Nodo ${nodoId} no encontrado`);
    }
  }
  

// Función para ejecutar el recorrido BFS y cambiar los colores de los nodos
function ejecutarBFS(grafo, nodoInicial) {
    let ultimoNodo = ''
    let visitados = {};
    let cola = [nodoInicial];
    console.log('*-*-*-Iniciando Recorrido-*-*-*-*');
    // Función para ejecutar el paso BFS con un intervalo de tiempo
    function pasoBFS() {
        if (cola.length > 0) {
            let verticeActual = cola.shift();
            if (!visitados[verticeActual]) {
                visitados[verticeActual] = true;
                cambiarColorNodo(verticeActual, '#8EEA7A');
            ultimoNodo = verticeActual
                let adyacentes = grafo[verticeActual];
                adyacentes.forEach(adyacente => {
                    if (!visitados[adyacente]) {
                        cola.push(adyacente);
                    }
                });
            }
            setTimeout(pasoBFS, 1000); // Ejecutar el siguiente paso después de un intervalo de tiempo
        } else {

            console.log('Recorrido BFS completado');
            let circleUltimoNodo = document.getElementById(ultimoNodo)
            circleUltimoNodo.classList.remove('visitado')
            circleUltimoNodo.style.fill = "#8a2be2"
            circleUltimoNodo.classList.add('nodoFin')
            console.log('el ultimo nodo en ser iterado es: ', ultimoNodo);
        }
    }   
    
    pasoBFS(); // Iniciar el recorrido BFS
}














// function bfs(grafo, vInicial, e) {
//     let visitados = {}; // Objeto para almacenar los nodos visitados
//     let cola = [vInicial]; // Cola para el recorrido en anchura

//     while (cola.length > 0) { // Mientras haya nodos en la cola
//         let verticeActual = cola[0]; // primer nodo de la cola
//         cola = cola.slice(1); // Eliminamos el primer elemento de la cola
//         if (e.target.classList.contains('txtnodoSpan')) {
//             console.log('desde validacion');
//         }
//         if (!visitados[verticeActual]) { // Si el nodo actual no ha sido visitado
//             visitados[verticeActual] = true; // Marcamos el nodo como visitado
//             console.log(verticeActual);  

//             let adyacentes = grafo[verticeActual]; // Obtenemos los nodos adyacentes al nodo actual
//             adyacentes.forEach(adyacente => { // Agregamos los nodos adyacentes a la cola...
//                 if (!visitados[adyacente]) { // ...si no han sido visitados
//                     cola.push(adyacente);
//                 }
//             });
//         }
//     }
// }