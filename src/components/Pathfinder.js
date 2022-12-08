import React, { useState } from "react";
import Node from "./Node";
import uniqid from "uniqid";
import "./Pathfinder.css";
import dijkstra from "./algorithms/dijkstra";

function Pathfinder() {
  const [gridWidth, setGridWidth] = useState(50);
  const [gridHeight, setGridheight] = useState(30);
  const [startCoord, setStartCoord] = useState({ x: 5, y: 15 });
  const [finishCoord, setFinishCoord] = useState({ x: 45, y: 15 });
  const [nodes, setNodes] = useState(() => initiateNodes());

  function initiateNodes() {
    let nodeArray = [];

    for (let i = 0; i < gridWidth; i++) {
      let newArray = [];
      for (let j = 0; j < gridHeight; j++) {
        let newNode = createNode(i, j);
        if (i === startCoord.x && j === startCoord.y) {
          newNode.isStart = true;
        }
        if (i === finishCoord.x && j === finishCoord.y) {
          newNode.isFinish = true;
        }
        newArray.push(newNode);
      }
      nodeArray.push(newArray);
    }

    return nodeArray;
  }

  function createNode(x, y) {
    return {
      row: y,
      column: x,
      prev: null,
      distance: Infinity,
      visited: false,
      isWall: false,
      isStart: false,
      isFinish: false,
      display: false,
    };
  }
  //function animateAlgorithm(grid, finalNode) {}
  function startAlgorithm() {
    let duplicate = nodes.slice();
    let bundle = dijkstra(
      duplicate,
      nodes[startCoord.x][startCoord.y],
      nodes[finishCoord.x][finishCoord.y]
    );
    console.log(bundle.array);
    console.log(nodes);
    for (let i = 0; i < bundle.array.length; i++) {
      setTimeout(() => {
        let curTravelledNode = bundle.array[i];
        let newGrid = nodes.slice();
        curTravelledNode.display = true;
        newGrid[curTravelledNode.column][curTravelledNode.row] =
          curTravelledNode;
        setNodes(() => newGrid);
      }, 20 * i);
    }
  }

  return (
    <div className="container">
      <button onClick={() => startAlgorithm()}> Start Algorithm</button>
      <div id="grid">
        {nodes.map((row) => {
          return (
            <div className="column" key={uniqid()}>
              {row.map((node) => (
                <Node key={uniqid()} nodeInfo={node}></Node>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pathfinder;
