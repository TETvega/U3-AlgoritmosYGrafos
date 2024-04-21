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