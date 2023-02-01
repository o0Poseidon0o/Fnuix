import React from "react";
import "./BlueContainer.css";

// Component nền xanh
const BlueContainer = (props) => {
  const classes = "blue-container " + props.className;
  return <div className={classes}>{props.children}</div>;
};

export default BlueContainer;
