import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// // Đọc file JSON
// // --------------Cách 1------------------
// const navBar = require("../../../data/navBar.json");
// // ------------cách 2------------
import navBar from "../../data/navBar.json";
const NavBarItem = () => {
  return navBar.map((item) => (
    <div key={item.style}>
      <div>{item.icon}</div>

      <div>{item.type}</div>
    </div>
  ));
};
export default NavBarItem;
