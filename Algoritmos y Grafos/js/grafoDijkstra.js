// BOTONES -------------------


const btnSelecionarGrafo = document.getElementById("seleccionarGrafo")
const btnEjecutarGrafo = document.getElementById('ejecutarAlgoritmo')
const btnLimpiarContenido = document.getElementById('limpiarContenido')
const btnCopy = document.getElementById('btn_CopiarAlgoritmo')

const casillaNodoInicial =document.getElementById('nodo-Inicial')
const casillaNodoFinal =document.getElementById('nodo-Final')


const formulario = document.getElementById('formularioDatosGrafos')

// Variables Globales -------------    
// un array que grada los nodos de los grafos y sus pociciones si se quiere modificar es en esta parte 
// Esta en min 
const posicionCirculos=[{nombre:'Grafo1',circulos:[{nombre:'A',left:50,top:50,LINEAS:[{goTo:'B',peso:10},{goTo:'E',peso:2},{goTo:'F',peso:15}]},{nombre:'B',left:200,top:150,LINEAS:[{goTo:'G',peso:5}]},{nombre:'C',left:300,top:50,LINEAS:[{goTo:'D',peso:1},{goTo:'G',peso:2}]},{nombre:'D',left:400,top:200,LINEAS:[{goTo:'A',peso:3},{goTo:'E',peso:2}]},{nombre:'E',left:500,top:100,LINEAS:[{goTo:'G',peso:4}]},{nombre:'F',left:600,top:300,LINEAS:[{goTo:'G',peso:1},{goTo:'E',peso:2},{goTo:'B',peso:1}]},{nombre:'G',left:250,top:300,LINEAS:[]}]},{nombre:'Grafo2',circulos:[{nombre:'A',left:100,top:150,LINEAS:[{goTo:'B',peso:1},{goTo:'E',peso:2}]},{nombre:'B',left:290,top:350,LINEAS:[{goTo:'G',peso:2}]},{nombre:'C',left:300,top:220,LINEAS:[{goTo:'D',peso:1},{goTo:'G',peso:1}]},{nombre:'D',left:310,top:258,LINEAS:[{goTo:'A',peso:7},{goTo:'E',peso:1}]},{nombre:'E',left:40,top:300,LINEAS:[{goTo:'C',peso:4}]},{nombre:'F',left:600,top:40,LINEAS:[{goTo:'A',peso:3},{goTo:'E',peso:2}]},{nombre:'G',left:250,top:100,LINEAS:[{goTo:'A',peso:4},{goTo:'E',peso:2}]}]},{nombre:'Grafo3',circulos:[{nombre:'A',left:300,top:250,LINEAS:[{goTo:'G',peso:1},{goTo:'F',peso:3}]},{nombre:'B',left:390,top:359,LINEAS:[{goTo:'C',peso:4},{goTo:'E',peso:6}]},{nombre:'C',left:40,top:20,LINEAS:[{goTo:'D',peso:9}]},{nombre:'D',left:100,top:100,LINEAS:[{goTo:'F',peso:1},{goTo:'E',peso:3}]},{nombre:'E',left:40,top:300,LINEAS:[{goTo:'C',peso:4}]},{nombre:'F',left:600,top:40,LINEAS:[{goTo:'E',peso:2}]},{nombre:'G',left:280,top:170,LINEAS:[{goTo:'E',peso:2}]}]}];


let grafoIsInicializate = false // variable que sirve en el inicianilazor al cargar la pagina 





// ========================= FUNCION PARA CARGAR EL GRAFO INICIAL ===========
// carga el grafo incial solo si la varible es falsa esto cuando la pagina se ha cargado solamente
const cargarGrafoInicial = async() => {
    if (!grafoIsInicializate) {
        cargarGrafo('Grafo1') // mandamos a cargar los grafos directamente 
        mostrarTabla('Grafo1') //mostramos la tabla
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


    casillaNodoInicial.addEventListener('keypress' , verificarNodos)
    casillaNodoFinal.addEventListener('keypress' , verificarNodos)
    btnEjecutarGrafo.addEventListener('click' , ejecutarGrafo) // obtiene los datos y ejecuta el grafo
    btnSelecionarGrafo.addEventListener('change' , mostrarGrafo) // captura cuando se seleciona otro grafo y lo manda a cargar 
    btnLimpiarContenido.addEventListener('click' , limpiarTodo)
    btnCopy.addEventListener('click' , copiarAlgoritmo)
    addEventListener('click' , mostrarInformacionNodal)
}




// ------ FUNCIONES PRIMARIAS -------===========
// Funcion para limpiar los colores y el formulario 
function limpiarTodo(e) {
    e.preventDefault()
    formularioDatosGrafos.reset()
    limpiarcirculos()
}


function copiarAlgoritmo(e) {
    e.preventDefault()

    const codigo = document.getElementById("algoritmoDijkstraCopy").textContent
    navigator.clipboard.writeText(codigo)
    // console.log(codigo);
    alert('Codigo copiado al Portapapeles')
}



// ejecuta el grafo  Funcion que trae los datos verifica y ejecuta Dijkstra
function ejecutarGrafo(e) {
    e.preventDefault()

    limpiarcirculos()
    // traendo los datos 
    const nodoInicial = document.getElementById("nodo-Inicial").value.toUpperCase()
    const nodoFinal = document.getElementById("nodo-Final").value.toUpperCase()
    const grafoSeleccionado = document.getElementById('seleccionarGrafo').value

    // para verificar que no hay errores
    let error = false

    // console.log(nodoInicial);
    error = verErrores(nodoInicial , grafoSeleccionado)
    if (error) return
    
    error = verErrores(nodoFinal , grafoSeleccionado)
    if (error) return

    // ajusta los datos para traer el grafico completo de la siguiente forma {a:{b:3,c:4},b{e:3}}
    const grafico = ajustargrafico(grafoSeleccionado)

    // ejecuta el algoritmo y desempaqueta el resultado --- Esto por que es asyncrona 
    algoritmoDijkstra(grafico , nodoInicial , nodoFinal).then( resultado=> {
        if (resultado.peso === Infinity) {
            document.getElementById('ResultadoEscritoGrafo').innerHTML = `No hay un camino desde el nodo ${nodoInicial} al nodo ${nodoFinal}. Mira la tabla de apuntadores y pesos`
            return
        }
        // console.log(resultado);
        pintarResultado(resultado.caminoMasCorto)
        escribirResultadoGrafo(resultado.caminoMasCorto , resultado.peso)
    })
    
}

// Funcion que escribe el resultado en resultados de la siguiente forma A ==> B ==> E 
function escribirResultadoGrafo(camino , peso) {
    let contenido =``

    camino.forEach( (nodo, index) =>{
        // console.log(index)
        if (camino.length-1 == index) {
            contenido+=nodo
        }else{
            contenido+= `${nodo} ==> `
        }
        
    })
    contenido+= `<br>Con un peso de ${peso}`
    // console.log(contenido)
    document.getElementById('ResultadoEscritoGrafo').innerHTML = contenido
}

async function pintarResultado( camino) {
    // usamos el asyn para decirle que espere y que se vea como animado el pintar los nodos rojos
    for (const nodo of camino) {
        const nodoElemento =document.getElementById(`${nodo}`)
        if (nodoElemento.classList.contains('bg-warning')) {
            nodoElemento.classList.remove('bg-warning')   
        }
        nodoElemento.classList.add('bg-danger')
        await esperar(800)
    }
}

// funcion para ver y mostrar la informcaion de los nodos -- Pinta el nodo actual y a los que apunta
function mostrarInformacionNodal(e) {
    // e.preventDefault() // todo desactivarlo po que causaba error con el comportamiento determinado de los links
    // console.log(e.target);
    if (e.target.classList.contains('circle')) {

        // limpia los colores por si estaba algun circulo selecionado
        limpiarcirculos()

        const seleccion = document.getElementById("seleccionarGrafo").value
        const nodoPrimario = e.target

        const grafo = posicionCirculos.find( item => item.nombre === seleccion) 
        
        if (!grafo) {
            mandarResultado(`No se encontro el Nodo buscado en el grafo`)
            return
        }
            const nodoDirigidos = encontarNodosDirigidos(nodoPrimario , grafo)
            // console.log(nodoDirigidos);
            pintarNodos(nodoPrimario , nodoDirigidos)
    }
}

// funcion que evalua el valor de la selecion y segun manda a cargar los datos 
function mostrarGrafo(e) {
    e.preventDefault()

    const seleccion = document.getElementById("seleccionarGrafo").value
    if (seleccion === '') {
        mandarResultado(`ERROR al no encontrar la selecion`)
    }
    mandarResultado(`Se cargara el ${seleccion}`)
    cargarGrafo(seleccion)
    mostrarTabla(seleccion)
}



// ------- FUNCIONES SECUNDARIAS =========================================================================
// Algoritmo completo de Dijkstra 
async function algoritmoDijkstra(grafo, nodoInicial, nodoFinal) {
    const nodos = Object.keys(grafo)// los nodos que tenemos A , B , C . D , E , F 


    const distancias = {}
    const visitados = {}
    const camino = {}

    // inicializamos todos los valores con nulos y distancias infinitas(no la conocemos aun)
    for (let nodo of nodos) {
        distancias[nodo] = Infinity;
        camino[nodo] = null;
    }

    
    distancias[nodoInicial] = 0;

    while (true) {
        let nodoActual = null;
        let distanciaMinima = Infinity;

        // Encontrar el nodo no visitado con la distancia minima
        for (let nodo in distancias) {
            // para cada nodo en distancias 
            // hace una comparacion si el nodo existe en visitados y si la distamncia del nodo es menor 
            if (!visitados[nodo] && distancias[nodo] < distanciaMinima){
                marcarNodoActual(nodo)
                await esperar(800)
                nodoActual = nodo;
                distanciaMinima = distancias[nodo];
            }
        }
        
        if (nodoActual === null) break //no hay mas nodos que visitar

        // marca el nodo actual como visitadop
        visitados[nodoActual] = true;
        marcarNodoVisitado(nodoActual)
        await esperar(500)
        

        // actualiza las distancias del nodo para cada nodo adyacente
        for (let vecino in grafo[nodoActual]){
            let distancia = distanciaMinima + grafo[nodoActual][vecino]
            if (distancia < distancias[vecino]) {
                // actualizamos los valores si la distancia es mas corta 
                distancias[vecino] = distancia
                camino[vecino] = nodoActual
            }
        }
    }

    // constructor de la ruta final
    let nodo = nodoFinal
    // se constrye desde el nodo final al nodo inicial 
    const caminoMasCorto = []
    while (nodo !== null) {
        // agregando al inicio el nodo 
        caminoMasCorto.unshift(nodo)
        nodo = camino[nodo]
    }
    const distaciaFinal = distancias[nodoFinal]
    const resultado = {caminoMasCorto , peso: distaciaFinal}
    limpiarcirculos()
    await esperar(500)
    return resultado
}

// Funcion que pinta el nodo actual de color azul 
 function marcarNodoActual(nodo) {
    const structuraNodo= document.getElementById(nodo)
    if (structuraNodo.classList.contains('bg-warning') ||structuraNodo.classList.contains('bg-success')) {
        structuraNodo.classList.remove('bg-warning') ||structuraNodo.classList.remove('bg-success')
    }
    structuraNodo.classList.add('bg-primary')
 }

//  Funcion que pinta el nodo visitado de color verde 
 function marcarNodoVisitado(nodo) {
    const structuraNodo= document.getElementById(nodo)
    // console.log(structuraNodo);
    if (structuraNodo.classList.contains('bg-warning') || structuraNodo.classList.contains('bg-primary')) {
        structuraNodo.classList.remove('bg-warning') || structuraNodo.classList.remove('bg-primary')
    }
    
    structuraNodo.classList.add('bg-success')
 }


// ajusta los parametros del grafo para que sea mas facil leer y ejecutar el codigo
function ajustargrafico(grafoSelecionado) {
    
    const grafo = posicionCirculos.find( grafo => grafo.nombre === grafoSelecionado) 
    const grafico = {}
    grafo.circulos.forEach( nodo => {

        const conexion={}

        nodo.LINEAS.forEach( linea => {

            const nodoDestino = linea.goTo
            const pesoTramo = linea.peso
            conexion[nodoDestino]=pesoTramo
        })
        // incerta el nodo y las conexiones 
        grafico[nodo.nombre]=conexion
    })
    // resultado es asi 
    // {a:{b:2,c:4}, b:{h:6,e:2}, c:{d:3,g:1}} 
    // se constituye de 
    // { nodo{nodoApuntado:PesoDelTrayecto} , }
    return grafico
}


// funcion que pinta los nodos adyacentes de colores y el primario de otro 
function pintarNodos(nodoPrimario, nodoDirigidos) {
    
    pintarNodoPrimario(nodoPrimario)  // pinta de verde
    pintarNodosSecundarios(nodoDirigidos) // los vecions de azul 

}

// funcion que retorna a donde se dirige los nodos  del nodo que se esta presionando
function encontarNodosDirigidos(nodoPrimario, grafo) {
    const nodosEncontrados=[]
    grafo.circulos.forEach(nodo => {
        if (nodo.nombre === nodoPrimario.textContent) {
            nodo.LINEAS.forEach(linea => {
                nodosEncontrados.push(linea)
            });
        }
    });

    return nodosEncontrados
}

// recibe el grafo que tiene que cargar 
function cargarGrafo( grafo) {
    // limpiamos el contenido por si antes estaba otro grafo cargado 
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
// Pinta el nodo primario de verde
function pintarNodoPrimario(nodo) {
    nodo.classList.remove('bg-warning')
    nodo.classList.add('bg-success')
}
// pinta los nodos secundarios de azul 
function pintarNodosSecundarios( arrayNodos) {
    
    arrayNodos.forEach(nodo => {
        // Buscar el primer elemento cuyo texto coincida con el valor de goTo
        const elementoCoincidente = document.querySelector(`.${nodo.goTo}`);
        
        // Verificar si se encontró un elemento y pintarlo
        if (elementoCoincidente) {
            elementoCoincidente.classList.remove('bg-warning');
            elementoCoincidente.classList.add('bg-primary');
        } else {
            mandarResultado(`No se encontro un nodo con el nombre ${nodo.goTo}`)
        }
    })
}

// crea los circulos de cada grafo
function crearCirculo(grafo) {
    grafo.forEach(circulo => {
        const circle = document.createElement('div');

        circle.classList.add('circle' , 'bg-warning', 'text-center' , 'aling-items-center' , `${circulo.nombre}`);
        circle.setAttribute( 'id' , `${circulo.nombre}`) // se le agrga el id segun el nombre para que sea mas facil al pintar el resultado
        // agrgando los stilos de cada circulo segun los px que indicamos en el array global 
        circle.style.left = `${circulo.left}px`;
        circle.style.top = `${circulo.top}px`;
        circle.textContent = circulo.nombre; 
        // agragmos el circulo 
        contenidoCanvas.appendChild(circle);
    });
}

// Crea las lineas de los nodos de punto a al punto B 
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



// funcion que valida los campos del Nodo
function verErrores(nodo , grafoSelecionado) {
    // console.log(nodo.length);
    if (nodo.trim() === '') {
        mandarErrorFormulario(`ERROR : Imposible Ingresar un caracter vacio en `)
        // limpiando despues de 3000
        setTimeout( () => mandarErrorFormulario('...') , 3000 )
        return true
    }
    if (nodo.length > 1 ) {
        mandarErrorFormulario(`ERROR : Imposible Ingresar un nodo con mas de 1 caracter`)
        // limpiando despues de 3000
        setTimeout( () => mandarErrorFormulario('...') , 3000 )
        return true
    }

    const grafoRecibido = posicionCirculos.find(item => item.nombre === grafoSelecionado);
    const grafo = grafoRecibido.circulos

    if (!grafo) {
        mandarErrorFormulario(`ERROR el grafo no se encontro`)
        return
    }
    const r =grafo.find( circulo => circulo.nombre===nodo)
    // console.log(r);
    if (!grafo.find( circulo => circulo.nombre===nodo)) {
        mandarErrorFormulario(`ERROR el nodo ${nodo} no se encontro`)
        return      
    }

}



// -- verifica si el nodo ingresado en el formulario,ulario existye 
function verificarNodos(e) {
    // uso de las expresiones regiulares donde se hace por medio de /[ valores  que quiero ]/
    // url del video visto : https://www.youtube.com/watch?v=0V3rIrSBzTU&ab_channel=Funnycode

    const expresionRegular = /^[A-Za-z ]+$/  //https://es.stackoverflow.com/questions/359350/cual-es-la-expresion-regular-para-aceptar-solo-letras-espacios-y-caracteres-es#:~:text=Simplemente%20agregas%20los%20caracteres%20que%20quieres%20que%20acepte,prefieres%20%C3%BAnicamente%20espacios%20en%20vez%20de%20cualquier%20blanco
    //  e.key obtiene el valor de la tecla presionada 
    // y el test vasicamentre que valide que sea parte de la expresion regular 
    if ( !expresionRegular.test(e.key)) {
        e.preventDefault()
        // console.log("se presiono un caracter no permitido" );
        mandarErrorFormulario('ERROR : Imposible Ingresar caracter no permitido!!!!')
        // limpiando despues de 2000
        setTimeout( () => mandarErrorFormulario('...') , 3000 )
    }

}




// -------------- Funcion que  escribve el resultado o los errores ocurridos duramnte la Ejecucion 
function mandarResultado( resultado) {
    
    ResultadoEscritoGrafo.innerHTML = `${resultado}`
}

// funcion que manda mensajes de error en el formulario
function mandarErrorFormulario( resultado) {
    
    capturaErrores.innerHTML = `${resultado}`
}

// funcion que limpia los cuirculos y los vieve de color amarrillo 
function limpiarcirculos() {
    
    const arrayCirculos = document.querySelectorAll('.circle')
    arrayCirculos.forEach( elemeto => {
        if (elemeto.classList.contains('bg-success') || elemeto.classList.contains('bg-primary') || elemeto.classList.contains('bg-danger')) {
            elemeto.classList.remove('bg-success') || elemeto.classList.remove('bg-primary') || elemeto.classList.remove('bg-danger')
            elemeto.classList.add('bg-warning')
        }
    });
}

// funcion que recibe un tiempo y hace que espere el usuario 
function esperar(tiempoMs) {
    return new Promise(resolve => {
        setTimeout(resolve, tiempoMs)
    })
}