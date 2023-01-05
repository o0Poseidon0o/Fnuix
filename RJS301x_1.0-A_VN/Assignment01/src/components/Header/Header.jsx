import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="container-fluid">
      <form className="form-header p-1">
        <input
          type="text"
          class="form-control m-1"
          id="exampleFormControlInput1"
          placeholder="Where are you going?"
        ></input>
        <input
          type="date"
          class="form-control m-1"
          id="exampleFormControlInput1"
          placeholder="06/24/2022 to 06/24/2022"
        ></input>
        <input
          type="text"
          class="form-control m-1"
          id="exampleFormControlInput1"
          placeholder="1 aduit 0 children 1 room"
        ></input>
        <button className="btn btn-primary">Search</button>
      </form>
    </div>
  );
}
export default Header;
