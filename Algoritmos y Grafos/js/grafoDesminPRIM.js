const Grafos = {
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
};
