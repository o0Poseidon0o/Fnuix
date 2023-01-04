import React from "react";
import "./Header";

function Header() {
  return (
    <div className="container hea">
      <form className="form-header d-flex">
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Where are you going?"
        ></input>
        <input
          type="date"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="06/24/2022 to 06/24/2022"
        ></input>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="1 aduit 0 children 1 room"
        ></input>
        <button className="btn btn-primary">Search</button>
      </form>
    </div>
  );
}
export default Header;
