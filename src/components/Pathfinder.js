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
  const isMouseDown = useRef(false);
  const isHoldingStart = useRef(false);
  const isHoldingFinish = useRef(false);
  const currCol = useRef(0);
  const currRow = useRef(0);

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
        if (finalNode) {
          setTimeout(() => {
            animateFinalPath(getFinalPath(finalNode));
          }, 10 * i);
        }
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

  function animateFinalPath(finalPath) {
    for (let i = 0; i <= finalPath.length; i++) {
      if (i === finalPath.length) {
        toggleRunning();
        return;
      }
      setTimeout(() => {
        let curNode = finalPath[i];
        document.getElementById(
          `node-${curNode.column}-${curNode.row}`
        ).className = "node final-path-node";
      }, 25 * i);
    }
  }

  function getFinalPath(finalNode) {
    let curNode = finalNode;
    let finalPath = [];
    while (curNode.prev != null) {
      if (curNode.prev.isStart) {
        return finalPath;
      }
      finalPath.push(curNode.prev);
      curNode = curNode.prev;
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

  function resetWalls() {
    if (isRunning.current) {
      return;
    }
    const newGrid = nodes.slice();
    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        let nodeClassName = document.getElementById(`node-${i}-${j}`).className;
        newGrid[i][j].isWall = false;
        if (
          nodeClassName !== "node start-node" &&
          nodeClassName !== "node finish-node"
        ) {
          document.getElementById(`node-${i}-${j}`).className = "node";
        }
      }
    }
  }

  //mouse events

  function handleMouseEnter(col, row) {
    if (isRunning.current) {
      return;
    }
    if (isMouseDown.current) {
      let curNode = nodes[col][row];
      if (isHoldingStart.current) {
        if (curNode.isWall || curNode.isFinish) {
          return;
        }
        nodes[currCol.current][currRow.current].isStart = false;
        document.getElementById(
          `node-${currCol.current}-${currRow.current}`
        ).className = "node";
        curNode.isStart = true;
        document.getElementById(`node-${col}-${row}`).className =
          "node start-node";

        currCol.current = col;
        currRow.current = row;
        setStartCoord({ x: col, y: row });

        return;
      }

      if (isHoldingFinish.current) {
        if (curNode.isWall || curNode.isStart) {
          return;
        }
        nodes[currCol.current][currRow.current].isFinish = false;
        document.getElementById(
          `node-${currCol.current}-${currRow.current}`
        ).className = "node";
        curNode.isFinish = true;
        document.getElementById(`node-${col}-${row}`).className =
          "node finish-node";

        currCol.current = col;
        currRow.current = row;
        setFinishCoord({ x: col, y: row });
        return;
      }

      if (curNode.isWall) {
        document.getElementById(`node-${col}-${row}`).className = "node";
      } else {
        if (curNode.isStart || curNode.isFinish) {
          return;
        }
        document.getElementById(`node-${col}-${row}`).className =
          "node wall-node";
      }
      curNode.isWall = !curNode.isWall;
    }
  }

  function handleMouseDown(col, row) {
    if (isRunning.current) {
      return;
    }
    isMouseDown.current = true;
    let curNode = nodes[col][row];

    if (curNode.isStart) {
      currCol.current = col;
      currRow.current = row;
      isHoldingStart.current = true;
      return;
    }
    if (curNode.isFinish) {
      currCol.current = col;
      currRow.current = row;
      isHoldingFinish.current = true;
      return;
    }

    if (curNode.isWall) {
      document.getElementById(`node-${col}-${row}`).className = "node";
    } else {
      document.getElementById(`node-${col}-${row}`).className =
        "node wall-node";
    }
    curNode.isWall = !curNode.isWall;
  }

  function handleMouseUp() {
    isMouseDown.current = false;

    if (isHoldingStart.current) {
      isHoldingStart.current = !isHoldingStart.current;
    }

    if (isHoldingFinish.current) {
      isHoldingFinish.current = !isHoldingFinish.current;
    }
  }

  function handleMouseLeave() {
    isMouseDown.current = false;

    if (isHoldingStart.current) {
      isHoldingStart.current = !isHoldingStart.current;
    }

    if (isHoldingFinish.current) {
      isHoldingFinish.current = !isHoldingFinish.current;
    }
  }

  return (
    <div className="container">
      <div id="toolbar">
        <button
          className="buttons start-button"
          onClick={() => startAlgorithm()}
        >
          {" "}
          Start Algorithm
        </button>
        <button
          className="buttons reset-grid-button"
          onClick={() => resetGrid()}
        >
          {" "}
          Reset Grid{" "}
        </button>
        <button
          className="buttons reset-walls-button"
          onClick={() => resetWalls()}
        >
          {" "}
          Reset Walls{" "}
        </button>
      </div>
      <div id="grid" onMouseLeave={() => handleMouseLeave()}>
        {nodes.map((row) => {
          return (
            <div className="column" key={uniqid()}>
              {row.map((node) => (
                <Node
                  key={uniqid()}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseEnter={handleMouseEnter}
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
