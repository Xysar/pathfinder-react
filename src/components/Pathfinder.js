import React, { useState } from "react";
import Node from "./Node";
import uniqid from "uniqid";
import "./Pathfinder.css";
import dijkstra from "./algorithms/dijkstra";

function Pathfinder() {
  const [gridWidth, setGridWidth] = useState(50);
  const [gridHeight, setGridheight] = useState(30);
  const [nodes, setNodes] = useState(() => initiateNodes());

  function initiateNodes() {
    let nodeArray = [];
    let startArray = null;
    let endArray = null;
    for (let j = 0; j < gridHeight; j++) {
      let newArray = new Array(gridWidth);
      for (let i = 0; i < gridWidth; i++) {
        let newNode = createNode(i, j);
        if (i === 5 && j === 15) {
          newNode.isStart = true;
        }
        if (i === 45 && j === 15) {
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
    };
  }

  function startAlgorithm() {
    console.log("test");
  }

  return (
    <div className="container">
      <button onClick={() => startAlgorithm()}> Start Algorithm</button>
      <div id="grid">
        {nodes.map((row) => {
          return row.map((node) => (
            <Node key={uniqid()} nodeInfo={node}></Node>
          ));
        })}
      </div>
    </div>
  );
}

export default Pathfinder;
