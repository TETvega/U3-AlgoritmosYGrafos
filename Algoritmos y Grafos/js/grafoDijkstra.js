// BOTONES -------------------


const btnSelecionarGrafo = document.getElementById("seleccionarGrafo")



// Variables Globales -------------    

const posicionCirculos = [
        {
            nombre: 'grafo1',
            circulos: [
                { nombre: 'A', left: 50, top: 50, LINEAS: [
                    { goTo: 'B', peso: 10 },
                    { goTo: 'E', peso: 2 }
                ]},
                { nombre: 'B', left: 200, top: 150, LINEAS: [
                    { goTo: 'G', peso: 5 },
                ]},
                { nombre: 'C', left: 300, top: 50, LINEAS: [
                    { goTo: 'D', peso: 1 },
                    { goTo: 'G', peso: 2 }
                ]},
                { nombre: 'D', left: 400, top: 200, LINEAS: [
                    { goTo: 'A', peso: 3 },
                    { goTo: 'E', peso: 2 }
                ]},
                { nombre: 'E', left: 500, top: 100, LINEAS: [
                    { goTo: 'G', peso: 4 },
                ]},
                { nombre: 'F', left: 600, top: 300, LINEAS: [
                    { goTo: 'G', peso: 1 },
                    { goTo: 'E', peso: 2 }
                ]},
                { nombre: 'G', left: 250, top: 300, LINEAS: [
                ]}
            ]
        }

];

cargarListeners()


function cargarListeners() {
    
    
    btnSelecionarGrafo.addEventListener('change' , mostrarGrafo)

}



// ------ FUNCIONES PRIMARIAS -------===========

function mostrarGrafo(e) {
    e.preventDefault()

    const seleccion = document.getElementById("seleccionarGrafo").value
    switch (true) {

        // caso 1 Grafo#1
        case seleccion === 'Grafo1':

            mandarResultado('Se cargara el Grafo #1')
            cargarGrafo('grafo1')
            mostrarTabla('grafo1')
            
            break;
        // Caso 2 grafo #2
        case seleccion === 'Grafo2':

             mandarResultado('Se cargara el Grafo #2')
        break;

        // caso 3 Grafo #3
        case seleccion === 'Grafo3':
            mandarResultado('Se cargara el Grafo #3')
        
        break;
        // Caso 4 Grafo creado 
        case seleccion === 'Grafo4':
            mandarResultado('Se cargara el Grafo #4')
            break;

            // ERROR O NO ENCOINTRADO
        default:
            mandarResultado('ERROR : Algun error al cargar los GRAFOS!!!')
            break;
    }
}



// ------- FUNCIONES SECUNDARIAS =====

function cargarGrafo( grafo) {

    const circulos1 = posicionCirculos.find(item => item.nombre === grafo);
    grafo = circulos1.circulos
    circulos1.circulos.forEach(circulo => {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.classList.add('text-center' , 'aling-items-center');
        circle.style.left = `${circulo.left}px`;
        circle.style.top = `${circulo.top}px`;
        circle.textContent = circulo.nombre; 
        contenidoCanvas.appendChild(circle);
    });

    // Crear líneas que conecten los círculos
    circulos1.circulos.forEach(circulo => {
        // para cada linea de go to 


        // Esta funcion fue creada con CHATGPT
        // BASICAMENTE TIRA LAS LINEAS DE UN PUNTO A OTRO
        circulo.LINEAS.forEach(linea => {
            const lineaElement = document.createElement('div');
            lineaElement.classList.add('linea');

            const desde = circulos1.circulos.find(c => c.nombre === circulo.nombre);
            const hacia = circulos1.circulos.find(c => c.nombre === linea.goTo);

            if (desde && hacia) {
                // se agrega +15 para centrar correctamente la linea por el radio de los circulos 
                const x1 = desde.left + 15; 
                const y1 = desde.top + 15;
                const x2 = hacia.left + 15;
                const y2 = hacia.top + 15;

                    // largo de la linea o camino que necesita recorrer 
                    // UTILIZA la formula de la Hipotenusa 

                    // Si pasaron 110 y 110 con rajo le entienden
                lineaElement.style.width = `${Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)}px`;

                // /Punto de partida de la linea 
                lineaElement.style.left = `${x1}px`;
                lineaElement.style.top = `${y1}px`;

                // angulo de la linea 
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                lineaElement.style.transform = `rotate(${angle}deg)`;

                contenidoCanvas.appendChild(lineaElement);
            }
        });
    });

}

function mostrarTabla(grafo) {
    const grafoEncontrado = posicionCirculos.find(item => item.nombre === grafo);
    
    // hacer un fix despues y hacer m,ejor la tabla luego 
    let tablaHTML = '';
    grafoEncontrado.circulos.forEach((circulo , index) => {
        circulo.LINEAS.forEach(linea => {
            const nodo = circulo.nombre;
            const peso = linea.peso;
            const nodoDestino = linea.goTo;
            tablaHTML += `
            <tr>
            <td class="text-center">${nodo}</td>
            <td class="text-center">${nodoDestino}</td>
            <td class="text-center">${peso}</td>
            </tr>`;
        });
    });

    tableBody_nodos.innerHTML = tablaHTML;
}



// -------------- Funcion que  escribve el resultado o los errores ocurridos duramnte la Ejecucion 
function mandarResultado( resultado) {
    
    ResultadoEscritoGrafo.innerHTML = `${resultado}`
}