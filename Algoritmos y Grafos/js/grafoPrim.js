import { esperar ,conexionYaExiste, crearLineasPorNodo, crearNodos } from "./helpers/CreateGrafos.js"



// exportacion de funcioes 

// Varbles Globales 
let grafoIsInicializate= false
let conexionNodal = []
const Grafos = [
{
  nombre: "Grafo1",
  tipo: "Bidirecional",
  conexiones:[
    {A:{B:2, C:3 }},
    {B:{A:2, E:5 , F:6 }},
    {C:{A:3, E:2 , D:1 }},
    {D:{C:1, G:1 , K:3 }},
    {E:{B:5, C:2 , F:9 , H:2 }},
    {F:{B:6, E:9 , G:2 }},
    {G:{D:1, F:2 , K:3 , H:4 }},
    {H:{I:1, J:20 }},
    {K:{I:3, J:3 }},
      
  ],
  nodos: [
    {
      nodo: "A",
      posicion: { x: 35, y: 370 },
    },
    {
        nodo: "B",
        posicion: { x: 95, y: 200 },
    },
    {
      nodo: "C",
      posicion: { x: 120, y: 440 },
    },
    {
        nodo: "D",
        posicion: { x: 55, y: 680 },
    },
    {
      nodo: "E",
      posicion: { x: 180, y: 300 },
    },
    {
      nodo: "F",
      posicion: { x: 200, y: 100 },
    },
    {
      nodo: "G",
      posicion: { x: 170, y: 560 },
    },
    {
      nodo: "H",
      posicion: { x: 210, y: 490 },
    },
    {
      nodo: "I",
      posicion: { x: 300, y: 310 },
    },
    {
      nodo: "J",
      posicion: { x: 350, y: 600 },
    },
    {
      nodo: "K",
      posicion: { x: 240, y: 700 },
    },
  ]
}]
// ========================= FUNCION PARA CARGAR EL GRAFO INICIAL ===========
// carga el grafo incial solo si la varible es falsa esto cuando la pagina se ha cargado solamente
const cargarGrafoInicial = async() => {
  if (!grafoIsInicializate) {
      cargarGrafo('Grafo1') // mandamos a cargar los grafos directamente 
      grafoIsInicializate=true
  }    

}
// cuando se carga la pagina manda a llamar el grafo inicial por default
window.addEventListener("load", async () => {
  await cargarGrafoInicial()
});


cargarEvenListeners()

function cargarEvenListeners() {
  


  
  addEventListener('click' , grafoMinimoDeExpancion)
}


async function grafoMinimoDeExpancion(e) {
  
  if (e.target.classList.contains('circle')) {

    console.log(e.target)
    pasarNodosEstadoNoVisitado()

    await esperar(300)



  }
}






function cargarGrafo(grafo) {
  contenidoCanvas.innerHTML = ''
  // tableBody_nodos.innerHTML = ''

  const infoGrafo = Grafos.find(item => item.nombre === grafo)
  // console.log(grafoRecibido);
  // cambiamos el valor del parametro de string al array 
  if (!infoGrafo) {
      mandarResultado(`ERROR el grafo no se encontro`)
      return
  }
  crearNodos(infoGrafo.nodos)
  crearConexionesNodales(infoGrafo.conexiones)


}



function crearConexionesNodales(conexiones) {
  conexiones.forEach(nodo => procesarConexionNodal(nodo))
}

function procesarConexionNodal(nodo) {
    for (let nodoActual in nodo) {
      // comparando si el objeto es igial ala llave 
      if (nodo.hasOwnProperty(nodoActual)) {
        partirConexionNodal(nodoActual,nodo)
      }
    }
}

function partirConexionNodal(nodoActual, nodo) {
  let nodoOrigen = nodoActual; // apuntamos al nodo actual
  let conexionesActuales = nodo[nodoActual]; // obtenemos las conexiones
  for (let nodoApuntado in conexionesActuales) {
    if (conexionesActuales.hasOwnProperty(nodoApuntado)) {
      let nodoDestino = nodoApuntado; // Almacena el nodo apuntado
      let peso = conexionesActuales[nodoApuntado]; // Almacena el peso de la conexión

      // obtencion de los elementos del html 
      let nodoPrimario = document.getElementById(nodoOrigen);
      let nodoSecundario = document.getElementById(nodoDestino);

      // creacion del objeto 
      const conexion = {
        nodo: nodoOrigen,
        nodoDestino: nodoDestino,
      }
      if (!conexionYaExiste(nodoDestino, nodoOrigen, conexionNodal)) {
        conexionNodal.push(conexion);
        crearLineasPorNodo(nodoPrimario, nodoSecundario);
      }
    }
  }
}



// funciones para colores 
function pasarNodosEstadoNoVisitado() {
  const nodeArray = document.querySelectorAll('.circle')
  const arrayNodos = [...nodeArray]
  // console.log(arrayNodos);
  arrayNodos.forEach( nodo => {
    nodo.classList.remove('bg-warning');
    nodo.classList.add('bg-secondary');
  })
}
