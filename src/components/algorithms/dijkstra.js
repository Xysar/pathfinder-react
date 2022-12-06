function dijkstra(grid, start, end) {
  let queue = [];
  start.distance = 0;
  queue.push(start);
  let travelledNodes = [];
  while (queue.length !== 0) {
    let cur = queue.shift();
    travelledNodes.unshift(cur);
    if (cur.row === end.row && cur.column === end.column) {
      let finalNode = cur;
      return {
        array: travelledNodes,
        final: finalNode,
      };
    }
    if (
      !(cur.column + 1 >= grid[0].length) &&
      !grid[cur.column + 1][cur.row].visited
    ) {
      let nextNode = grid[cur.column + 1][cur.row];
      nextNode.visited = true;
      nextNode.prev = cur;
      queue.push(nextNode);
    }
    if (!(cur.column - 1 > 0) && !grid[cur.column - 1][cur.row].visited) {
      let nextNode = grid[cur.column - 1][cur.row];
      nextNode.visited = true;
      nextNode.prev = cur;
      queue.push(nextNode);
    }
    if (
      !(cur.row + 1 >= grid.length) &&
      !grid[cur.column][cur.row + 1].visited
    ) {
      let nextNode = grid[cur.column][cur.row + 1];
      nextNode.visited = true;
      nextNode.prev = cur;
      queue.push(nextNode);
    }
    if (!(cur.row - 1 > 0) && !grid[cur.column][cur.row - 1].visited) {
      let nextNode = grid[cur.column][cur.row - 1];
      nextNode.visited = true;
      nextNode.prev = cur;
      queue.push(nextNode);
    }
  }

  return {
    array: travelledNodes,
    final: null,
  };
}

export default dijkstra;
