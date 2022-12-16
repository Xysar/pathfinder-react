import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "./Node.css";

function Node({ nodeInfo, wallClick }) {
  let { row, column, isStart, isFinish, isWall } = nodeInfo;

  let extraClassName = "";
  if (isStart) {
    extraClassName += "start-node";
  }
  if (isFinish) {
    extraClassName += "finish-node";
  }
  //   if (isWall) {
  //     extraClassName += "wall-node";
  //   }

  return (
    <div
      id={`node-${column}-${row}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => wallClick(column, row)}
    ></div>
  );
}

export default Node;
