import { toDate } from "date-fns";
import React from "react";
import "./SearchPopup.css";

// Cấu trúc form tìm kiếm
const SearchPopup = () => {
  return (
    <form className="search-popup">
      <h3>Search</h3>
      <label>Destination</label>
      <input type="text"></input>
      <label>Check-in Date</label>
      <input placeholder="30/11/2020 to 30/11/2020" type="text"></input>
      <div className="options">
        <label>Options</label>
        <ul>
          <li>
            <label>Min price per night</label>
            <input type="number"></input>
          </li>
          <li>
            <label>Max price per night</label>
            <input type="number"></input>
          </li>
          <li>
            <label>Adult</label>
            <input type="number" placeholder="1"></input>
          </li>
          <li>
            <label>Chilren</label>
            <input type="number" placeholder="0"></input>
          </li>
          <li>
            <label>Room</label>
            <input type="number" placeholder="1"></input>
          </li>
        </ul>
      </div>
      <button>Search</button>
    </form>
  );
};

export default SearchPopup;
