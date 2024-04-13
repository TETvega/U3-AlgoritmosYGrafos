
// BOTONES -------------------


const bntBuscar = document.getElementById('btn_buscarNumero')  
const btnLimpiar = btn_limpiarTextos 
const btnCopiarLinalUnica = document.getElementById("btn_CopiarLinealUnica")
const btnCopiarMultiple = document.getElementById("btn_CopiarLinealMultiple")

const impt_ArrayNumeros = document.getElementById('lista_Numeros')


cargarListeners()


function cargarListeners() {
    
    impt_ArrayNumeros.addEventListener('keypress' , verificarNumeros)
    bntBuscar.addEventListener('click' , buscarNumero)
    btnLimpiar.addEventListener('click' , limpiarTextos)
    btnCopiarLinalUnica.addEventListener('click' , copiarUnica)
    btnCopiarMultiple.addEventListener('click' ,copiarMultiple)
}

// ------------- FUNCION PARA BUSCAR LOS NUMEROS -----

// Funcion para mandar codigo al portapapeles 
// https://www.youtube.com/watch?v=8tQQqVuUDjg&ab_channel=WikiTutoriales
function copiarUnica(e) {
    e.preventDefault()

    const codigo = document.getElementById("codigoBusquedaUnica").textContent
    navigator.clipboard.writeText(codigo)
    // console.log(codigo);
    alert('Codigo copiado al Portapapeles')
    
}

function copiarMultiple(e) {
    e.preventDefault()
    const codigo = document.getElementById("codigoBusquedaMultiple").textContent
    navigator.clipboard.writeText(codigo)
    // console.log(codigo);
    alert('Codigo copiado al Portapapeles')
}

function buscarNumero(e) {
    e.preventDefault()
    // console.log('Hola');
    
    
    const tipoBuqueda = seleccionarBusqueda.value // estoy llamando directamente por el ID al tipo de seleecion , obtiente el valor excato 
    const numeroABuscar = leerNumeroX()

    if (numeroABuscar===-1) {
        return
    }

    
    const arrayNumeros = leerArrayNumeros()
    if (arrayNumeros.length == 0) {
        mandarResultado('ERROR : Imposible la lista no contiene ningun numero valido!!!!')
        return

    }
    escribirArray(arrayNumeros)
    
    switch (true) {
        case tipoBuqueda === 'Unica':
                busquedaLinealUnica( numeroABuscar , arrayNumeros )
            break;
        
        case tipoBuqueda === 'Multiple':
            busquedaLinealMultiple( numeroABuscar , arrayNumeros )
        break;
        default:
            break;
    }
    // console.log(numeroABuscar);
}

// Funcion para Limpiar los formularios y respuesta
function limpiarTextos(e) {
    e.preventDefault()
    // console.log('Adiso');

    numero_Buscado.value = ""
    lista_Numeros.value = ""
    mandarResultado('...')
}


// Funcion para Verificar que se ingresen solo numeros y la , en el Imput de lista Numeros

function verificarNumeros(e) {
    // uso de las expresiones regiulares donde se hace por medio de /[ valores  que quiero ]/
    // url del video visto : https://www.youtube.com/watch?v=0V3rIrSBzTU&ab_channel=Funnycode

    const expresionRegular = /[0-9]/
    //  e.key obtiene el valor de la tecla presionada 
    // y el test vasicamentre que valide que sea parte de la expresion regular 
    if ( !expresionRegular.test(e.key)) {
        e.preventDefault()
        // console.log("se presiono un caracter no permitido" );
        mandarResultado('ERROR : Imposible Ingresar caracter no permitido!!!!')
        // limpiando despues de 2000
        setTimeout( () => mandarResultado('...') , 3000 )
    }

}



// -----------------------------  FUNCIONES SECUNDARIAS Y TERCIARIAS ---------/

// Funcion que verifica si el numero es de tipo entero, si el no campo esta vacio 
function leerNumeroX() {
    const numero = document.getElementById('numero_Buscado').value  // campo del valor a buscar
    // console.log(numero);

    if (numero === '') {
        mandarResultado('ERROR: El campo Buscar Numero esta Vacio !!!!')
        return -1
    }
    if ( !Number.isInteger(parseFloat(numero))) {
        mandarResultado('ERROR: El numero es de tipo Flotante !!!!')
        return -1
    }
    if (numero < 0) {
        mandarResultado('Error: Para este ejercicio no estar permitidos los numero negativos')
        return -1
    }
    return numero
}

// llee los numero ingresados para la lista y ademas elimina los espacios vacions entre comas 
function leerArrayNumeros() {
    // console.log(impt_ArrayNumeros)
    const arrayenTexto= impt_ArrayNumeros.value
    // console.log(arrayenTexto);

    const array = arrayenTexto.split(',')
    // console.log(array);

    const arrayNumeros = []
    
    array.map( numero => { if (numero.trim() !=='') arrayNumeros.push(numero) })

    return arrayNumeros
    // console.log(arrayNumeros);
}

// busqueda de forma lineal unica donde solo se busca uun numero
async function busquedaLinealUnica( numeroBuscado , listaNumeros) {

    await esperar(1000)
    document.getElementById('animacionAlgoritmo').innerHTML =''
    let bandera = false
    for (let i = 0; i < listaNumeros.length; i++) {
        
        const elemento = document.createElement('span');
        if (i===0) {
            elemento.textContent = `[ ${listaNumeros[i]} ]`;
        }else{
            elemento.textContent = `, [ ${listaNumeros[i]} ]`;
        }
        animacionAlgoritmo.appendChild(elemento);
        if (!bandera) {
            elemento.classList.add('text-primary')
            await esperar(1000)
            
        }
        if (numeroBuscado === listaNumeros[i]) {
            bandera=true
            await esperar(500)
            mandarResultado(`Se encontro el Numero Buscado: "${numeroBuscado}".\nEn la posicion #${i+1}`)
            aplicarEstilo(elemento, true);
        }
        if (!bandera) {
            aplicarEstilo(elemento, false);
        }
    }
    if (!bandera) {
        mandarResultado(`No se encontro el numero buscado: "${numeroBuscado}" en la lista proporcionada`)
    }
}

function esperar(tiempo) {
    return new Promise( esperar => setTimeout(esperar, tiempo));
}
// Funcion para aplicar estilos al elemento delos numeros
function aplicarEstilo(elemento, esNumeroBuscado) {
    elemento.classList.remove('text-primary');
    if (esNumeroBuscado) {
        
        elemento.classList.add('text-success');
    } else {
        elemento.classList.add('text-danger');
    }
}


// / funqueda lineal Multiple// se tiene que rcorrer todo el array para encontar el o los numeros 
async function busquedaLinealMultiple( numeroBuscado , listaNumeros) {
    let bandera = false
    await esperar(1000)
    document.getElementById('animacionAlgoritmo').innerHTML =''
    let numerosEncontrados= []
    for (let i = 0; i < listaNumeros.length; i++) {


        const elemento = document.createElement('span');
        if (i===0) {
            elemento.textContent = `[ ${listaNumeros[i]} ]`;
        }else{
            elemento.textContent = `, [ ${listaNumeros[i]} ]`;
        }
        animacionAlgoritmo.appendChild(elemento);
        elemento.classList.add('text-primary')
        await esperar(1000)
        if (numeroBuscado === listaNumeros[i]) {
            await esperar(500)
            numerosEncontrados.push(i)
            aplicarEstilo(elemento, true);
        }else{
            aplicarEstilo(elemento, false);
        }
    }

    if (!bandera) {
        mandarResultado(`No se encontro el numero buscado: "${numeroBuscado}" en la lista proporcionada`)
    }else if(bandera){

        let indicesLetras = ''
        numerosEncontrados.forEach( indice => {
            indicesLetras+= indice+1 +", "
        });
        mandarResultado(`Se encontro el Numero Buscado: "${numeroBuscado}".
        \nEn la posicion #${indicesLetras}`)
        
    }
}

// -------------- Funcion que  escribve el resultado o los errores ocurridos duramnte la Ejecucion 
function mandarResultado( resultado) {
    
    ResultadoLineal.innerHTML = `${resultado}`
}

function escribirArray( array) {
    let contenido =``
    array.forEach( numero =>{

        contenido+=`[ ${numero} ], `

    })
    document.getElementById('animacionAlgoritmo').innerHTML = contenido
}