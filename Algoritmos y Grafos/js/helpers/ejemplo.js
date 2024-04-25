function prim(connections, start) {
    const mst = {};
    const visited = new Set();
  
    while (visited.size < connections.length) {
      let minCost = Infinity;
      let currentNode = null;
      let currentNodeNeighbor = null;
  
      for (const edge of connections) {
        const node = Object.keys(edge)[0];
        if (visited.has(node)) continue;
        
        for (const neighbor in edge[node]) {
          const cost = edge[node][neighbor];
          if (cost < minCost && !visited.has(neighbor)) {
            minCost = cost;
            currentNode = node;
            currentNodeNeighbor = neighbor;
          }
        }
      }
      
      if (currentNode && currentNodeNeighbor) {
        mst[currentNodeNeighbor] = { node: currentNodeNeighbor, cost: minCost };
        visited.add(currentNodeNeighbor);
        console.log(`Agregado nodo: ${currentNodeNeighbor}, Costo: ${minCost}, Árbol actual:`, mst);
      }
    }
  
    return mst;
  }
  
  const connections = [
    { "A": { "B": 2, "C": 3 }},
    { "B": { "A": 2, "E": 5, "F": 6 }},
    { "C": { "A": 3, "E": 2, "D": 1 }},
    { "D": { "C": 1, "G": 1, "K": 3 }},
    { "E": { "B": 5, "C": 2, "F": 9, "H": 2 }},
    { "F": { "B": 6, "E": 9, "G": 2 }},
    { "G": { "D": 1, "F": 2, "K": 3, "H": 4 }},
    { "H": { "I": 1, "J": 20 }},
    { "K": { "I": 3, "J": 3 }}
  ];
  
  console.log(prim(connections, 'A'));
