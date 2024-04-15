function jumpSearch(listaNumeros, numeroBuscado) {
    const n = listaNumeros.length;
  
    // Calcular el paso de salto (ajustar según el tamaño de la matriz)
    const jumpStep = Math.floor(Math.sqrt(n));
  
    let i = 0;
  
    // Encuentra el primer elemento cuyo valor es mayor o igual
    while (i < n && listaNumeros[i] < numeroBuscado) {
      i += jumpStep;
    }
  
    // Si paso los límites de la matriz, la búsqueda falló
    if (i >= n) {
      return -1;
    }
  
    // Búsqueda lineal dentro del subarreglo
    for (let j = i - 1; j >= 0 && listaNumeros[j] >= numeroBuscado; j--) {
      if (listaNumeros[j] === numeroBuscado) {
        return j;
      }
    }
  
    return -1; // Valor no encontrado
  }