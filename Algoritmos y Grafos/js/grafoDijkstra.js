// BOTONES -------------------


const btnSelecionarGrafo = document.getElementById("seleccionarGrafo")



// Variables Globales -------------    
// un array que grada los nodos de los grafos y sus pociciones si se quiere modificar es en esta parte 
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
        },
        {
            nombre: 'grafo2',
            circulos: [
                { nombre: 'A', left: 100, top: 150, LINEAS: [
                    { goTo: 'B', peso: 1 },
                    { goTo: 'E', peso: 2 }
                ]},
                { nombre: 'B', left: 290, top: 350, LINEAS: [
                    { goTo: 'G', peso: 2 },
                ]},
                { nombre: 'C', left: 300, top: 220, LINEAS: [
                    { goTo: 'D', peso: 1 },
                    { goTo: 'G', peso: 1 }
                ]},
                { nombre: 'D', left: 310, top: 258, LINEAS: [
                    { goTo: 'A', peso: 7 },
                    { goTo: 'E', peso: 1 }
                ]},
                { nombre: 'E', left: 40, top: 300, LINEAS: [
                    { goTo: 'C', peso: 4 },
                ]},
                { nombre: 'F', left: 600, top: 40, LINEAS: [
                    { goTo: 'A', peso: 3 },
                    { goTo: 'E', peso: 2 }
                ]},
                { nombre: 'G', left: 250, top: 100, LINEAS: [
                    { goTo: 'A', peso: 4 },
                    { goTo: 'E', peso: 2 }
                ]}
            ]
        },
        {
            nombre: 'grafo3',
            circulos: [
                { nombre: 'A', left: 300, top: 250, LINEAS: [
                    { goTo: 'G', peso: 1 },
                    { goTo: 'F', peso: 3 }
                ]},
                { nombre: 'B', left: 390, top: 359, LINEAS: [
                    { goTo: 'C', peso: 4 },
                    { goTo: 'E', peso: 6 },
                ]},
                { nombre: 'C', left: 40, top: 20, LINEAS: [
                    { goTo: 'D', peso: 9 },
                ]},
                { nombre: 'D', left: 100, top: 100, LINEAS: [
                    { goTo: 'F', peso: 1 },
                    { goTo: 'E', peso: 3 }
                ]},
                { nombre: 'E', left: 40, top: 300, LINEAS: [
                    { goTo: 'C', peso: 4 },
                ]},
                { nombre: 'F', left: 600, top: 40, LINEAS: [
                    { goTo: 'E', peso: 2 }
                ]},
                { nombre: 'G', left: 280, top: 170, LINEAS: [
                    { goTo: 'E', peso: 2 }
                ]}
            ]
        }

];

let grafoIsInicializate = false // variable que sirve en el inicianilazor al cargar la pagina 
// ========================= FUNCION PARA CARGAR EL GRAFO INICIAL ===========
// garga el grafo incial solo si lavarible es falsa esto cuando la pag se ha cargado solamente
const cargarGrafoInicial = async() => {
    if (!grafoIsInicializate) {
        cargarGrafo('grafo1') // mandamos a cargar los grafos sirectamente 
        mostrarTabla('grafo1') //mostramos la tabla
        grafoIsInicializate=true
    }    
}
// cuando se carga la pagina manda a llamar el grafo inicial por default
window.addEventListener("load", async () => {
    await cargarGrafoInicial()
});


// ==================== CARGANDO TODOS LOS ADD EVEN LISTENERS ================
cargarListeners()


function cargarListeners() {
    
    
    btnSelecionarGrafo.addEventListener('change' , mostrarGrafo) // captura cuando se seleciona otro grafo y lo manda a cargar 

}



// ------ FUNCIONES PRIMARIAS -------===========
// funcion que evalua el valor de la selecion y segun manda a cargar los datos 
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
             cargarGrafo('grafo2')
             mostrarTabla('grafo2')
        break;

        // caso 3 Grafo #3
        case seleccion === 'Grafo3':
            mandarResultado('Se cargara el Grafo #3')
            cargarGrafo('grafo3')
            mostrarTabla('grafo3')
        
        break;
            // ERROR O NO ENCOINTRADO
        default:
            mandarResultado('ERROR : Algun error al cargar los GRAFOS!!!')
            break;
    }
}



// ------- FUNCIONES SECUNDARIAS =====

// recibe el grafo que tiene que cargar 
function cargarGrafo( grafo) {
    // limpiamos el contenido por si ante sestava otro grafo cargado 
    contenidoCanvas.innerHTML = ''
    tableBody_nodos.innerHTML = ''
    // mapeamos el contenido segun el grafo que ocupamos
    const grafoRecibido = posicionCirculos.find(item => item.nombre === grafo);
    // cambiamos el valor del parametro de string al array 
    grafo = grafoRecibido.circulos

    if (!grafo) {
        mandarResultado(`ERROR el grafo no se encontro`)
        return
    }
    crearCirculo(grafo)
    crearLineasNodales(grafo)
   
}

// funcion para cargar los datos de la tabla segun el grafo 
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




// ========================= FUNCIONES TERCIARIAS =============
// crea los circulos de cada grafo
function crearCirculo(grafo) {
    grafo.forEach(circulo => {
        const circle = document.createElement('div');

        circle.classList.add('circle' , 'text-center' , 'aling-items-center');
        // circle.classList.add();
        // agrgando los stilos de cada circulo segun los px que indicamos en el array global 
        circle.style.left = `${circulo.left}px`;
        circle.style.top = `${circulo.top}px`;
        circle.textContent = circulo.nombre; 
        // agragmos el circulo 
        contenidoCanvas.appendChild(circle);
    });
}

function crearLineasNodales(grafo) {
 // Crear las lineas de recorrido en el canvas  ----- APOYO DE CHAT GPT/ GEMENNI Y COPILOT
 grafo.forEach(circulo => {
    // Esta funcion fue creada con CHATGPT
    // BASICAMENTE TIRA LAS LINEAS DE UN PUNTO A OTRO
    circulo.LINEAS.forEach(linea => {
        // obtiene los valores de donde tiene que ir hasta donde tiene que llegar el Nombre del NODO 
        const puntoPartida = grafo.find(nodo => nodo.nombre === circulo.nombre);
        const puntoFinalizacion = grafo.find(nodo => nodo.nombre === linea.goTo);

        
        // evalua si existen los nodos 
        if (!puntoPartida || !puntoFinalizacion) {
           mandarResultado('ERROR al cargar una Linea Nodal')
           return
        }
        crearLineasPorNodo(puntoPartida , puntoFinalizacion)
    });
});
}





// ------------- FUNCIONES DE 4 NIVEL --------------------
// crea las lineas por el nodo y las une al canvas
function crearLineasPorNodo( puntoPartida , puntoFinalizacion) {
    const lineaElement = document.createElement('div');
    lineaElement.classList.add('linea');

    // Aporte de Geminy para centrar correctamente las lineas
            // se agrega +15 para centrar correctamente la linea por el radio de los circulos que es R=15
            const posicionCirculox1 = puntoPartida.left + 15; 
            const posicionCirculoy1 = puntoPartida.top + 15;
            const posicionCirculox2 = puntoFinalizacion.left + 15;
            const posicionCirculoy2 = puntoFinalizacion.top + 15;

                // largo de la linea o camino que necesita recorrer 
                // UTILIZA la formula de la Hipotenusa 

                // Si pasaron 110 y 111 con rajo le entienden
                // es la de la Hipotenusa basicamente 
                // obtenemos la disferencias de los puntos en X y en Y para obtener el resultante que tiene que recorrer el nodo 
                // https://www.delftstack.com/es/howto/java/distance-between-two-points-java/ 
                lineaElement.style.width = `${Math.sqrt(Math.pow( (posicionCirculox2 - posicionCirculox1),2 )  + Math.pow((posicionCirculoy2 - posicionCirculoy1) ,2))}px`;

            // /Punto de partida de la linea 
            lineaElement.style.left = `${posicionCirculox1}px`;
            lineaElement.style.top = `${posicionCirculoy1}px`;

            // angulo de la linea 
            // resumidas cuentas es esta formula simplificada
                // A(x1, y1)
                // B(x2, y2)
                // cos(θ) = (x1 * x2 + y1 * y2) / (√(x1^2 + y1^2) * √(x2^2 + y2^2))
                // θ (radianes) = acos(cos(θ))
                // θ (grados) = θ (radianes) * 180/π
            const angle = Math.atan2(posicionCirculoy2 - posicionCirculoy1, posicionCirculox2 - posicionCirculox1) * 180 / Math.PI;
            lineaElement.style.transform = `rotate(${angle}deg)`;

            contenidoCanvas.appendChild(lineaElement);
}

// -------------- Funcion que  escribve el resultado o los errores ocurridos duramnte la Ejecucion 
function mandarResultado( resultado) {
    
    ResultadoEscritoGrafo.innerHTML = `${resultado}`
}