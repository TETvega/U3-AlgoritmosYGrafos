import { crearLineasPorNodo, crearNodos } from "./helpers/CreateGrafos"


// exportacion de funcioes 

// Varbles Globales 
let grafoIsInicializate= false

const Grafos = [
{
  nombre: "Grafo1",
  tipo: "Bidirecional",
  conexiones: {
      "A:B": 2,
      "A:C": 4,
      "B:D": 6,
      "B:F": 3,
  },
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
  leerConexiones


}
    
   