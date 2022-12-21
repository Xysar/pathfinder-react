import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "./Node.css";

function Node({ nodeInfo, onMouseDown, onMouseEnter, onMouseUp }) {
  let { row, column, isStart, isFinish, isWall } = nodeInfo;

  let extraClassName = "";
  if (isStart) {
    extraClassName += "start-node";
  }
  if (isFinish) {
    extraClassName += "finish-node";
  }
  if (isWall) {
    extraClassName += "wall-node";
  }

  return (
    <div
      id={`node-${column}-${row}`}
      className={`node ${extraClassName}`}
      onMouseEnter={() => onMouseEnter(column, row)}
      onMouseDown={() => onMouseDown(column, row)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
}

export default Node;
