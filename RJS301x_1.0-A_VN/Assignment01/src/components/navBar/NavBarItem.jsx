import React from "react";
// // Đọc file JSON
// // --------------Cách 1------------------
// const navBar = require("../../../data/navBar.json");
// // ------------cách 2------------
import navBar from "../../data/navBar.json";
const NavBarItem = (props) => {
  return navBar.map((item) => <div>{item.type}</div>);
};
export default NavBarItem;
