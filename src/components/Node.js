import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "./Node.css";

function Node({ nodeInfo }) {
  let className = "node";
  if (nodeInfo.isStart) {
    className += " start-node";
  }
  if (nodeInfo.isFinish) {
    className += " finish-node";
  }
  if (nodeInfo.display) {
    className += " visited-node";
  }
  return <div className={className} key={uniqid()}></div>;
}

export default Node;
