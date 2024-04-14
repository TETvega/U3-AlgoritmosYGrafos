document.addEventListener('DOMContentLoaded', () => {
    dibujarGrafo();
    let nodoActual = null; // almacenar el nodo actualmente presionado
    svgGrafo.addEventListener('click', (e) =>  // Evento de clic para iniciar el recorrido BFS desde el nodo presionado
    {    if (e.target.classList.contains('txtnodoSpan')) 
        {   let nodoPresionado = e.target.textContent;
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

        const nodosGrafos = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
            nodosGrafos.forEach(nodo => {
                let circle = document.getElementById(nodo)
                circle.style.fill = ''
                circle.classList.remove('nodoFin');
                circle.classList.remove('visitado');
                circle.classList.remove('nodoFin')
                circle.classList.add('no-visitado')
                console.log('Añadiendo la clase "no-visitado" a: ',nodo);
            })

            ejecutarBFS(grafo, nodoPresionado);
            // circleUltimoNodo = document.getElementById(ultimoNodo)
            // circleUltimoNodo.classList.add('nodoFin')
        }
    });
});

const grafo = { // representar el grafo en lista de adyacencia (en un objeto)
    'A': ['B'],
    'B': ['A', 'D', 'G'],
    'C': ['E', 'F'],
    'D': ['B', 'E', 'F', 'G'],
    'E': ['C', 'D', 'F'],
    'F': ['C', 'D', 'E', 'G'],
    'G': ['B', 'D', 'F']
};
// AQUI EMPIZAMOS A DIBUJAR EL GRAFO CON SVG
const svgGrafo = document.getElementById('graphSVG'); // llamar al contenedor svg
    const nodes = { // definir las posiciones de los nodos y sus nombres
        'A': {x: 169, y: 100},
        'B': {x: 456.3, y: 100},
        'C': {x: 169, y: 300},
        'D': {x: 338, y: 150},
        'E': {x: 84.5, y: 200},
        'F': {x: 676, y: 200},
        'G': {x: 470.3, y: 350}
    };
    
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
            let contenido = `
                <div class="d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="border: none;">
                        <circle cx="10" cy="10" r="10" id="${nodo}" class="circle"/>
                    </svg>
                    <span class="txtnodoSpan" style="position: absolute; top: -3px; cursor: pointer;">${nodo}</span>
                </div>
            `;
            foreignObj.innerHTML = contenido;
            svgGrafo.appendChild(foreignObj); // Agregar el foreignObject al SVG
        }
    }
    
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
    function dibujarGrafo() {
        dibujarAristas();
        dibujarNodos();
    }
// AQUI TERMINAMOS DE DIBUJAR EL GRAFO CON SVG

function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}
    async function cambiarColorNodo(nodoId, color) { // Funcion (cambiarColorNodo) para cambiar el color de un nodo en el SVG
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
  let ultimoNodo = ''
async function ejecutarBFS(grafo, nodoInicial)  // Funcion para ejecutar el recorrido BFS y cambiar los colores de los nodos
{   
    let visitados = {}; // objeto para almacenar los nodos visitados
    let cola = [nodoInicial];
    console.log('*-*-*-Iniciando Recorrido-*-*-*-*');
    // Función para ejecutar el paso BFS con un intervalo de tiempo
    while (cola.length > 0) 
    {   let verticeActual = cola[0]; // primer nodo de la cola
        cola = cola.slice(1); // Sacamos el primer nodo de la cola
        if (!visitados[verticeActual])  // Si el nodo actual no ha sido visitado
        {   visitados[verticeActual] = true; // Marcamos el nodo como visitado
            cambiarColorNodo(verticeActual, '#8EEA7A'); // cambiamos su estado (color)
        ultimoNodo = verticeActual // al finalizar el ciclo esta variable contendrá el ultimo nodo iterado; el cual se pintará de un color en especifico
            let adyacentes = grafo[verticeActual]; // obtenemos los nodos adyacentes al nodo actual
            adyacentes.forEach(adyacente => {
                if (!visitados[adyacente]) {
                    cola.push(adyacente); // Agregamos los nodos adyacentes a la cola (si no han sido visitados)
                }
            }); // fin forEach
        } // fin IF principal
        await sleep(1000); 
    } // fin WHILE
        let circleUltimoNodo = document.getElementById(ultimoNodo)
        circleUltimoNodo.classList.remove('visitado')
        circleUltimoNodo.classList.remove('circle')
        circleUltimoNodo.style.fill = '#8a2be2'
        circleUltimoNodo.classList.add('nodoFin')
        console.log('el ultimo nodo en ser iterado es: ', ultimoNodo); 
} 