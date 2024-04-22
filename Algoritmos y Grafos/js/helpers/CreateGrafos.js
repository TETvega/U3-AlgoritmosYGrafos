

// crea los nodos de cada grafo
export function crearNodos(grafo) {
    grafo.forEach(nodo => {
        const circle = document.createElement('div');

        circle.classList.add('circle' , 'bg-warning', 'text-center' , 'aling-items-center' , `${nodo.nodo}`);
        circle.setAttribute( 'id' , `${nodo.nodo}`) 
        circle.style.left = `${nodo.posicion.y}px`;
        circle.style.top = `${nodo.posicion.x}px`;
        circle.textContent = nodo.nodo; 
        // agregmos el nodo 
        contenidoCanvas.appendChild(circle);
    });
}

// crea las lineas por el nodo y las une al canvas
export function crearLineasPorNodo( puntoPartida , puntoFinalizacion) {
    const lineaElement = document.createElement('div');
    lineaElement.classList.add('linea');
            // se agrega +15 para centrar correctamente la linea por el radio de los circulos que es R=15
            const posicionCirculox1 = puntoPartida.left + 15; 
            const posicionCirculoy1 = puntoPartida.top + 15;
            const posicionCirculox2 = puntoFinalizacion.left + 15;
            const posicionCirculoy2 = puntoFinalizacion.top + 15
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