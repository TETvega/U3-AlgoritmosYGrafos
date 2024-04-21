// Variables Globales 
const posicionCirculos = [
    {
      nombre: "Grafo1",
      circulos: [
        {
          nombre: "A",
          left: 300,
          top: 20,
          LINEAS: [
            // { goTo: "B", peso: 10 },
            { goTo: "E", peso: 2 },
            { goTo: "C", peso: 5 },
            { goTo: "F", peso: 15 },
            { goTo: "D", peso: 6 },
          ],
        },
        { nombre: "B", left: 200, top: 150, LINEAS: [] },
        {
          nombre: "C",
          left: 100,
          top: 70,
          LINEAS: [
            { goTo: "D", peso: 1 },
            { goTo: "G", peso: 2 },
            { goTo: "B", peso: 3 },
          ],
        },
        {
          nombre: "D",
          left: 400,
          top: 200,
          LINEAS: [
          ],
        },
        { nombre: "E", left: 500, top: 100, LINEAS: [{ goTo: "G", peso: 4 }] },
        {
          nombre: "F",
          left: 600,
          top: 300,
          LINEAS: [
            { goTo: "G", peso: 1 },
    
            { goTo: "B", peso: 1 },
          ],
        },
        { nombre: "G", left: 250, top: 300, LINEAS: [] },
        {
            nombre: "H",
            left: 80,
            top: 230,
            LINEAS: [
              { goTo: "B", peso: 1 },
            ],
          },
          {
            nombre: "I",
            left: 700,
            top: 350,
            LINEAS: [
              { goTo: "F", peso: 1 },
              { goTo: "E", peso: 2 },
            ],
          },
          {
            nombre: "J",
            left: 700,
            top: 120,
            LINEAS: [
              { goTo: "E", peso: 2 },
            ],
          },
          {
            nombre: "K",
            left: 600,
            top: 180,
            LINEAS: [
              { goTo: "J", peso: 2 },
            ],
          },
      ],
    },
    {
      nombre: "Grafo2",
      circulos: [
        {
          nombre: "A",
          left: 600,
          top: 150,
          LINEAS: [
            { goTo: "B", peso: 1 },
            { goTo: "E", peso: 2 },
          ],
        },
        { nombre: "B", left: 290, top: 350, LINEAS: [{ goTo: "G", peso: 2 }] },
        {
          nombre: "C",
          left: 300,
          top: 220,
          LINEAS: [
            { goTo: "D", peso: 1 },
            { goTo: "G", peso: 1 },
          ],
        },
        {
          nombre: "D",
          left: 310,
          top: 258,
          LINEAS: [
            { goTo: "A", peso: 7 },
            { goTo: "E", peso: 1 },
          ],
        },
        { nombre: "E", left: 40, top: 300, LINEAS: [{ goTo: "C", peso: 4 }] },
        {
          nombre: "F",
          left: 600,
          top: 40,
          LINEAS: [
            { goTo: "A", peso: 3 },
            { goTo: "E", peso: 2 },
          ],
        },
        {
          nombre: "G",
          left: 250,
          top: 100,
          LINEAS: [
            { goTo: "A", peso: 4 },
            { goTo: "E", peso: 2 },
          ],
        },
      ],
    },
    {
      nombre: "Grafo3",
      circulos: [
        {
          nombre: "A",
          left: 300,
          top: 250,
          LINEAS: [
            { goTo: "G", peso: 1 },
            { goTo: "F", peso: 3 },
          ],
        },
        {
          nombre: "B",
          left: 390,
          top: 359,
          LINEAS: [
            { goTo: "C", peso: 4 },
            { goTo: "E", peso: 6 },
          ],
        },
        { nombre: "C", left: 40, top: 20, LINEAS: [{ goTo: "D", peso: 9 }] },
        {
          nombre: "D",
          left: 100,
          top: 100,
          LINEAS: [
            { goTo: "F", peso: 1 },
            { goTo: "E", peso: 3 },
          ],
        },
        { nombre: "E", left: 40, top: 300, LINEAS: [{ goTo: "C", peso: 4 }] },
        { nombre: "F", left: 600, top: 40, LINEAS: [{ goTo: "E", peso: 2 }] },
        { nombre: "G", left: 280, top: 170, LINEAS: [{ goTo: "E", peso: 2 }] },
      ],
    },
  ];
  
let grafoIsInicializate = false


window.addEventListener("load", async () => {
    await cargarGrafoInicial()
});

const cargarGrafoInicial = async () => {
    if (!grafoIsInicializate) {
        cargarGrafo('Grafo1')
        grafoIsInicializate = true
    }
}

// recibe el grafo que tiene que cargar 
function cargarGrafo(grafo) {
    contenidoCanvas.innerHTML = ''
    const grafoRecibido = posicionCirculos.find(item => item.nombre === grafo);
    grafo = grafoRecibido.circulos

    if (!grafo) {
        mandarResultado(`ERROR el grafo no se encontro`)
        return
    }
    crearCirculo(grafo)
    crearLineasNodales(grafo)

}

// crea los circulos de cada grafo
function crearCirculo(grafo) {
    grafo.forEach(circulo => {
        const circle = document.createElement('div');

        circle.classList.add('circle', 'bg-warning', 'text-center', 'aling-items-center', `${circulo.nombre}`);
        circle.setAttribute('id', `${circulo.nombre}`) 
        circle.style.left = `${circulo.left}px`;
        circle.style.top = `${circulo.top}px`;
        circle.textContent = circulo.nombre;
        // agragmos el circulo 
        contenidoCanvas.appendChild(circle);
    });
}


// Crea las lineas de los nodos de punto a al punto B 
function crearLineasNodales(grafo) {
    grafo.forEach(circulo => {
        circulo.LINEAS.forEach(linea => {
            // obtiene los valores de donde tiene que ir hasta donde tiene que llegar el Nombre del NODO 
            const puntoPartida = grafo.find(nodo => nodo.nombre === circulo.nombre);
            const puntoFinalizacion = grafo.find(nodo => nodo.nombre === linea.goTo);


            // evalua si existen los nodos 
            if (!puntoPartida || !puntoFinalizacion) {
                mandarResultado('ERROR al cargar una Linea Nodal')
                return
            }
            crearLineasPorNodo(puntoPartida, puntoFinalizacion)
        });
    });
}
// ------------- FUNCIONES DE 4 NIVEL --------------------
// crea las lineas por el nodo y las une al canvas
function crearLineasPorNodo(puntoPartida, puntoFinalizacion) {
    const lineaElement = document.createElement('div');
    lineaElement.classList.add('linea');
    // se agrega +15 para centrar correctamente la linea por el radio de los circulos que es R=15
    const posicionCirculox1 = puntoPartida.left + 15;
    const posicionCirculoy1 = puntoPartida.top + 15;
    const posicionCirculox2 = puntoFinalizacion.left + 15;
    const posicionCirculoy2 = puntoFinalizacion.top + 15;

    // obtenemos la disferencias de los puntos en X y en Y para obtener el resultante que tiene que recorrer el nodo 
    // https://www.delftstack.com/es/howto/java/distance-between-two-points-java/ 
    lineaElement.style.width = `${Math.sqrt(Math.pow((posicionCirculox2 - posicionCirculox1), 2) + Math.pow((posicionCirculoy2 - posicionCirculoy1), 2))}px`;

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



