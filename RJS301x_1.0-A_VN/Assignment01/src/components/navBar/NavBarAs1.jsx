import React from "react";
// // Đọc file JSON
// // --------------Cách 1------------------
// const navBar = require("../../../data/navBar.json");
// // ------------cách 2------------
import navBar from "../../data/navBar.json";
function NavBarAs1() {
  console.log(navBar);

  return navBar.map((record) => {
    return (
      <div className="container-fluid bg-primary">
        <div className="row">
          <div className="col-md-8">Booking wbsite</div>
          <div className="col-md-4">
            <button>Register</button>
            <button>Login</button>
          </div>
        </div>
        <div className="row">
          <ul>
            <li>{record.type}</li>
          </ul>
        </div>
      </div>
    );
  });
}
export default NavBarAs1;
