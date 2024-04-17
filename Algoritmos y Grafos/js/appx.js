let bandera = false;

document.addEventListener('DOMContentLoaded', () => {
    dibujarGrafo();
    let nodoActual = null; // almacenar el nodo actualmente presionado

    svgGrafo.addEventListener('click', async (e) => { 
        if (!bandera) {
            console.log(bandera);
            bandera = true;

            if (e.target.classList.contains('txtnodoSpan')) {   
                let nodoPresionado = e.target.textContent;
                console.log('Se presionó: ', nodoPresionado);
                
                if (nodoActual) { 
                    let circleNodoAnterior = document.getElementById(nodoActual);
                    circleNodoAnterior.classList.remove('nodoInicio');
                    circleNodoAnterior.classList.add('no-visitado'); 
                }
                nodoActual = nodoPresionado;
                
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
                    console.log('Añadiendo la clase "no-visitado" a: ', nodo);
                });
    
                await ejecutarBFS(grafo, nodoPresionado); // Espera hasta que BFS termine

                bandera = false;
                console.log(bandera);
            }
        }
    });
});
