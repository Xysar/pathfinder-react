import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "./Node.css";

function Node({ nodeInfo }) {
  let className = "";
  if (nodeInfo.isStart) {
    className += " start-node";
  }
  if (nodeInfo.isFinish) {
    className += " finish-node";
  }

  return (
    <div
      id={`node-${nodeInfo.column}-${nodeInfo.row}`}
      className={`node${className}`}
      key={uniqid()}
    ></div>
  );
}

export default Node;
