import React, { useEffect, useState, useCallback, useRef } from "react";
import Node from "./Node";
import uniqid from "uniqid";
import "./Pathfinder.css";
import dijkstra from "./algorithms/dijkstra";

function Pathfinder() {
  const [gridWidth, setGridWidth] = useState(50);
  const [gridHeight, setGridheight] = useState(30);
  const [startCoord, setStartCoord] = useState({ x: 5, y: 15 });
  const [finishCoord, setFinishCoord] = useState({ x: 45, y: 15 });
  const [nodes, setNodes] = useState([]);
  const isRunning = useRef(false);

  useEffect(() => {
    setNodes(() => initiateNodes());
  }, []);

  function toggleRunning() {
    isRunning.current = !isRunning.current;
  }

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
    };
  }

  function animateAlgorithm(travelledNodes, finalNode) {
    for (let i = 0; i <= travelledNodes.length; i++) {
      if (i === travelledNodes.length) {
        setTimeout(() => {
          toggleRunning();
        }, 12 * i);
        return;
      }
      setTimeout(() => {
        let curTravelledNode = travelledNodes[i];
        const nodeClassName = document.getElementById(
          `node-${curTravelledNode.column}-${curTravelledNode.row}`
        ).className;
        if (
          nodeClassName !== "node start-node" &&
          nodeClassName !== "node finish-node"
        ) {
          document.getElementById(
            `node-${curTravelledNode.column}-${curTravelledNode.row}`
          ).className = "node visited-node";
        }
      }, 10 * i);
    }
  }

  function startAlgorithm() {
    if (isRunning.current) {
      return;
    }
    resetGrid();
    toggleRunning();
    let algorithmResults = dijkstra(
      nodes,
      nodes[startCoord.x][startCoord.y],
      nodes[finishCoord.x][finishCoord.y]
    );
    animateAlgorithm(
      algorithmResults.travelledNodes,
      algorithmResults.finalNode
    );
  }

  function resetGrid() {
    if (isRunning.current) {
      return;
    }
    const newGrid = nodes.slice();
    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        let nodeClassName = document.getElementById(`node-${i}-${j}`).className;
        newGrid[i][j].visited = false;
        if (
          nodeClassName !== "node start-node" &&
          nodeClassName !== "node finish-node" &&
          nodeClassName !== "node wall-node"
        ) {
          document.getElementById(`node-${i}-${j}`).className = "node";
        }
      }
    }
  }

  //mouse events

  function handleMouseEvent(col, row) {
    let hoveredNodeClassName = (document.getElementById(
      `node-${col}-${row}`
    ).className = "node wall-node");
    nodes[col][row].isWall = true;
    console.log(col + " " + row);
  }

  return (
    <div className="container">
      <div id="toolbar">
        <button onClick={() => startAlgorithm()}> Start Algorithm</button>
        <button onClick={() => resetGrid()}> Reset Grid </button>
      </div>
      <div id="grid">
        {nodes.map((row) => {
          return (
            <div className="column" key={uniqid()}>
              {row.map((node) => (
                <Node
                  key={uniqid()}
                  wallClick={handleMouseEvent}
                  nodeInfo={node}
                ></Node>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pathfinder;
