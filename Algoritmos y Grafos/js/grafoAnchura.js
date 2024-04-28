const svgGrafo = document.getElementById('graphSVG'); // Llamar al contenedor svg
let bandera=false
let nodoInicial = null; // Almacenar el nodo inicial seleccionado por el usuario
let nodoDestino = null; // Almacenar el nodo destino seleccionado por el usuario

document.addEventListener('DOMContentLoaded',async () => {
     dibujarGrafo(); // Llamar a la función para dibujar el grafo
    
        svgGrafo.addEventListener('click', async(e) =>  // Evento de clic para iniciar el recorrido BFS desde el nodo presionado (y nodo destino)
        {   
            if (!bandera) 
            {  bandera=true;
                mostrarRecorrido.innerHTML = '';
                inicioFinDiv.innerHTML = '';
                        if (!nodoInicial) // Si aún no se ha seleccionado el nodo inicial
                        { 
                            if (e.target.classList.contains('txtnodoSpan')) 
                            {   nodoInicial = e.target.textContent;
                        
                                const nodosGrafos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
                                nodosGrafos.forEach(nodo => {
                                    let circle = document.getElementById(nodo)
                                    circle.style.fill = ''
                                    circle.classList.remove('nodoFin');
                                    circle.classList.remove('visitado');
                                    circle.classList.remove('nodoFin')
                                    circle.classList.add('no-visitado')
                                    circle.classList.remove('nodoInicio')
                                })

                                // Cambiar el color del nodo inicial seleccionado
                                let circleNodoInicial = document.getElementById(nodoInicial);
                                circleNodoInicial.classList.remove('no-visitado');
                                circleNodoInicial.classList.add('nodoInicio');
                                
                            }
                            alert('Ahora presione el nodo final.')
                        } else if (!nodoDestino) // Si ya se seleccionó el nodo inicial pero no el destino
                            { 
                                if (e.target.classList.contains('txtnodoSpan')) 
                                {   nodoDestino = e.target.textContent;
                                    // Cambiar el color del nodo destino seleccionado
                                    let circleNodoDestino = document.getElementById(nodoDestino);
                                    circleNodoDestino.classList.remove('no-visitado');
                                    circleNodoDestino.classList.remove('circle');
                                    circleNodoDestino.style.fill = '#8a2be2';
                                    circleNodoDestino.classList.add('nodoFin');
                                    
                                    // Ejecutar el algoritmo DFS con el nodo inicial y el destino
                                    await ejecutarBFS(grafo, nodoInicial, nodoDestino);
                                    nodoInicial = null; 
                                    nodoDestino = null;
                                }
                               
                            }
             bandera=false
            }     
            
        });
});


const grafo = { // Representar el grafo en lista de adyacencia (en un objeto)
    'A': ['C','B', 'D'],
    'B': ['A', 'E', 'F'],
    'C': ['A'],
    'D': ['A','G', 'H'],
    'E': ['J', 'I', 'B'],
    'F': ['B'],
    'G': ['D','K', 'L'],
    'H': ['D'],
    'I': ['E'],
    'J': ['E'],
    'K': ['G'],
    'L': ['G']
};

// *-*-*-*-*- AQUI SE EMPIEZA A DIBUJAR EL GRAFO CON SVG -*-*-*-*-*-*

const nodes = { // coordenadas de los nodos
    'A': {x: (204.5 + 160) * 1.2, y: 50},
    'B': {x: (104.5 + 160) * 1.2, y: 120},
    'C': {x: (204.5 + 160) * 1.2, y: 140},
    'D': {x: (304.5 + 160) * 1.2, y: 120},
    'E': {x: (4.5 + 160) * 1.2, y: 240},
    'F': {x: (104.5 + 160) * 1.2, y: 240},
    'G': {x: (304.5 + 160) * 1.2, y: 240},
    'H': {x: (404.5 + 160) * 1.2, y: 240},
    'I': {x: 125, y: 320},
    'J': {x: 197.4, y: 320},
    'K': {x: (304.5 + 160) * 1.2, y: 320},
    'L': {x: (304.5 + 160) * 1.2 + 72.4, y: 320}
};

function dibujarNodos() { // Función para dibujar los nodos
    for (let nodo in nodes) {  // 'for in' para iterar los nombres de los nodos, del objeto 'nodes'
        let coordenadas = nodes[nodo];

        let foreignObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject"); // // elemento en SVG que permite incrustar contenido HTML dentro de un documento SVG.
            foreignObj.setAttribute("x", coordenadas.x - 20); // Ajustar la posición segun el tamaño del círculo y el texto
            foreignObj.setAttribute("y", coordenadas.y - 20);
            foreignObj.setAttribute("width", 40); // Ajustar el ancho y el alto según el tamaño del círculo y el texto
            foreignObj.setAttribute("height", 40);
            foreignObj.classList.add('foreignObj');
            
            // Crear el contenido dentro del foreignObject. donde le estamos diciendo al navegador que cree elementos SVG(circle,osea el nodo) en lugar de elementos HTML regulares
            let contenido = `
                <div class="d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" style="border: none;">
                        <circle cx="20" cy="20" r="20" id="${nodo}" class="circle"/> 
                    </svg>
                    <span class="txtnodoSpan" style="position: absolute; top: 9px; cursor: pointer;">${nodo}</span>
                </div>
            `; // // La URL(linea 108) es un espacio de nombres (namespace) que se utiliza en XMLySVG para identificar los elementos y atributos específicos de SVG. 
            foreignObj.innerHTML = contenido; // añadir el contenido al foreignObj
            svgGrafo.appendChild(foreignObj); // Agregar el foreignObject al SVG en el html
    }
}

function dibujarAristas() { // Función para dibujar las aristas
    for (let nodo in grafo) {
        let nodosAdyacentes = grafo[nodo]; // Obtenemos los nodos adyacentes al nodo actual
        let puntoInicio = nodes[nodo]; // Obtenemos las coordenadas de inicio, del nodo actual del objeto 'nodes' 
        for (let i = 0; i < nodosAdyacentes.length; i++) { // Iteramos sobre cada nodo adyacente del nodo actual
            let nodoAdyacente = nodosAdyacentes[i];
            if (nodoAdyacente !== '') {
                let puntoFinal = nodes[nodoAdyacente]; // Obtenemos las coordenadas del nodo adyacente actual (punto final de la arista)
                let linea = document.createElementNS("http://www.w3.org/2000/svg", "line"); // Crear la línea
                linea.setAttribute("x1", puntoInicio.x); // Añadirle atributos de la línea que se acaba de crear.
                linea.setAttribute("y1", puntoInicio.y); // Coordenadas x1 e y1 para el punto de inicio de la línea (startPoint) 
                linea.setAttribute("x2", puntoFinal.x);
                linea.setAttribute("y2", puntoFinal.y); // Coordenadas x2 e y2 para el punto final de la línea (endPoint).
                linea.classList.add('arista');
                svgGrafo.appendChild(linea); // Mostrarlo en el HTML
            }
        }
    }
}

function dibujarGrafo() { // Función para dibujar el grafo
    dibujarAristas();
    dibujarNodos();
}

// *-*-*-*-*- AQUI TERMINAMOS DE DIBUJAR EL GRAFO CON SVG -*-*-*-*-*-*


function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));} //pausar la ejecucion del codigo durante un periodo de tiempo detrminado
   // funcion sleep proviniente de: https://www.campusmvp.es/recursos/post/como-hacer-un-sleep-en-javascript-detener-la-ejecucion-durante-un-tiempo.aspx
   
  async function cambiarColorNodo(nodoId) { // Funcion (cambiarColorNodo) para cambiar el color de un nodo en el SVG
    let nodo = document.getElementById(nodoId);
    if (nodo) // si no es null
    {            if(nodo.id === nodoInicial){ //  para mantener el color amarillo al nodo inicial
                    nodo.classList.add('nodoInicio')
                    return;
                }
        nodo.classList.add('nodoEnProceso');
        await sleep(800);
        nodo.classList.remove('nodoEnProceso');
        nodo.classList.add('visitado');
        nodo.classList.remove('no-visitado');
    } else {
        console.log(`Nodo ${nodoId} no encontrado`);
    }
}

// contendeores de los resultados
const mostrarRecorrido = document.querySelector('.mostrarRecorrido')
const inicioFinDiv = document.querySelector('.inicioFinDiv');

async function ejecutarBFS(grafo, nodoInicial)  // Funcion para ejecutar el recorrido BFS 
{   
    inicioFinDiv.innerHTML = `<span style="padding-left: 20px; font-size: 1.4em;">'${nodoInicial}' a '${nodoDestino}' es:</span>`;
    let visitados = {}; // objeto para almacenar los nodos visitados
    let cola = [nodoInicial];
    
    while (cola.length > 0) 
    {   let verticeActual = cola[0]; // primer nodo de la cola
        cola = cola.slice(1); // Sacamos el primer nodo de la cola

        if (!visitados[verticeActual])  // Si el nodo actual no ha sido visitado
        {   visitados[verticeActual] = true; // Marcamos el nodo como visitado
            cambiarColorNodo(verticeActual, '#8EEA7A'); // cambiamos su estado (color)
            
            // para mostar en html
            let nodoTexto = document.createElement('span'); 
            nodoTexto.textContent = ` -> ${verticeActual}`;
            mostrarRecorrido.appendChild(nodoTexto);
            
            let adyacentes = grafo[verticeActual]; // obtenemos los nodos adyacentes al nodo actual
            
            adyacentes.forEach(adyacente => {
                if (!visitados[adyacente]) {
                    cola.push(adyacente); // Agregamos los nodos adyacentes a la cola (si no han sido visitados)
                }
            }); // fin forEach
        } // fin IF principal

        await sleep(1000); // Esperamos un segundo antes de continuar con el siguiente nodo
        if (verticeActual === nodoDestino) { // Verificamos si el nodo actual es el destino
            alert('Recorrido Completado.')
            console.log("Se encontró el nodo de destino:", verticeActual);
            break; // Si se encontró el destino, salimos del bucle
        }
    } // fin WHILE 
} 