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
            foreignObj.classList.add('foreignObject');
            // foreignObj.style.cursor = "pointer"; // Cambiar el cursor a pointer cuando el mouse está sobre este elemento
            
            // Crear el contenido dentro del foreignObject
            let content = `
                <div class="d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="border: none;">
                        <circle cx="10" cy="10" r="10" class="${nodo}" />
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
    dibujarGrafo();

window.onload = dibujarGrafo();

    // const svgNodos = document.querySelector('.foreignObject')
    // console.log(svgNodos);
    // console.log('----');
    // svgNodos.addEventListener('click', (e) => {
    //     console.log('¡Se hizo clic en un círculo!');
    
    // })

svgGrafo.addEventListener('click', (e) => {  // seleccionar Nodo
    e.preventDefault()
    if (e.target.classList.contains('txtnodoSpan')) {
        let adyacentes = null;
        let nodoPresionado = e.target.textContent; // obtenemos el nombre del nodo
        const circle = document.querySelector(`.${nodoPresionado}`) // seleccionar <circle>
        const classCircle = circle.getAttribute('class')
        console.log(classCircle); // obtenemos el nombre del nodo (por medio de la clase del circle)
            adyacentes = grafo[classCircle]; // obtenemos a los nodos adyacetes al nodo seleccionado
        console.log(adyacentes);

        adyacentes.forEach(nodoAdyacente => {
            console.log(nodoAdyacente);
            let circleAdyacente = document.querySelector(`.${nodoAdyacente}`)
            console.log(circleAdyacente);
            // circleAdyacente.classList.add('adyacente')
            // circleAdyacente.style.fill = '#90D632'
            circleAdyacente.setAttribute('fill', 'red');
            console.log(circleAdyacente);// Cambiar el color del nodo actual a azul
          // nodoActual.classList.remove('no-visitado');
        })
        // console.log('Aqui inicia algoritmo');
        // bfs(grafo, nodoPresionado,e);
    }
})
// const nodoP = document.querySelector('.txtnodoSpan').textContent;
// console.log(nodoP, '****'); 



function bfs(grafo, vInicial, e) {
    if (e && e.target.classList.contains('txtnodoSpan')) {
        console.log('Llamada desde el evento de clic');
    } else {
        console.log('No se detectó un evento de clic válido');
    }

    let visitados = {}; // Objeto para almacenar los nodos visitados
    let cola = [vInicial]; // Cola para el recorrido en anchura
    while (cola.length > 0) { // Mientras haya nodos en la cola
      let verticeActual = cola[0]; // Primer nodo de la cola
      cola = cola.slice(1); // Eliminamos el primer elemento de la cola
      if (!visitados[verticeActual]) { // Si el nodo actual no ha sido visitado
        visitados[verticeActual] = true; // Marcamos el nodo como visitado
        console.log(verticeActual);
      
        // Obtener el elemento SVG del nodo actual y cambiar su clase
        const spans = document.querySelectorAll(".txtnodoSpan");
        console.log(spans);
        for (const span of spans) {
            // Comprobar si el contenido de texto del elemento coincide con la variable `x`
            if (span.textContent === verticeActual) {
              // Este es el elemento que estás buscando
              console.log(span);
              span.classList.add('visitado') // Imprimir el elemento en la consola
              let encontrado = true;
              break; // Salir del bucle si se encuentra el elemento
            }
            span.classList.remove('no-visitado');
          }
          

        
            // if (encontrado) {
            //     matchingSpan.style.color = 'blue'; // Cambiar el color del nodo actual a azul
            //     // nodoActual.classList.remove('no-visitado');
            // }
        
            // nodoActual.classList.add('visitado');
        let adyacentes = grafo[verticeActual]; // Obtenemos los nodos adyacentes al nodo actual
        adyacentes.forEach(adyacente => { // Agregamos los nodos adyacentes a la cola...
          if (!visitados[adyacente]) { // ...si no han sido visitados
            cola.push(adyacente);

            // Obtener el elemento SVG del nodo adyacente y cambiar su clase
            let nodoAdyacente = document.querySelector(`.nodo[data-nodo="${adyacente}"]`);
            // nodoAdyacente.classList.add('adyacente');
          }
        });
      }
    }
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