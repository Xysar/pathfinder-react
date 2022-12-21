function dijkstra(grid, start, end) {
  let queue = [start];
  let travelledNodes = [];
  while (queue.length !== 0) {
    let cur = queue.shift();
    if (cur.isFinish) {
      let finalNode = cur;
      return {
        travelledNodes: travelledNodes,
        finalNode: finalNode,
      };
    }
    if (cur.visited || cur.isWall) {
      continue;
    }
    cur.visited = true;
    travelledNodes.push(cur);
    const { column, row } = cur;
    let nextNode;
    if (column + 1 < grid.length && !grid[column + 1][row].visited) {
      nextNode = grid[column + 1][row];
      nextNode.prev = cur;
      queue.push(nextNode);
    }
    if (column - 1 >= 0 && !grid[column - 1][row].visited) {
      nextNode = grid[column - 1][row];
      nextNode.prev = cur;
      queue.push(nextNode);
    }
    if (row + 1 < grid[0].length && !grid[column][row + 1].visited) {
      nextNode = grid[column][row + 1];
      nextNode.prev = cur;
      queue.push(nextNode);
    }
    if (row - 1 >= 0 && !grid[column][row - 1].visited) {
      nextNode = grid[column][row - 1];
      nextNode.prev = cur;
      queue.push(nextNode);
    }
  }

  return {
    travelledNodes: travelledNodes,
    finalNode: null,
  };
}

export default dijkstra;
