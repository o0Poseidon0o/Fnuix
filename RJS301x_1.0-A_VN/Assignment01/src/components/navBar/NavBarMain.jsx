import React from "react";
import NavBarItem from "./NavBarItem";

function NavBarmain() {
  return (
    <div className="container-fluid bg-primary">
      <div className="row">
        <div className="col-md-9">BOOKING WEBSITE</div>
        <div className="col-md-3">
          <button>Registered</button>
          <button>Login</button>
        </div>
      </div>
      <div className="row">
        <NavBarItem></NavBarItem>
      </div>
    </div>
  );
}
export default NavBarmain;
