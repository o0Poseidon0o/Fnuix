import React from "react";
import "./Hotel.css";

const Hotel = (props) => {
  // Sự kiện khi click vào tên khách sạn-> chuyển đến trang detail
  const goToDetail = (event) => {
    event.preventDefault();
    window.location.replace("/detail");
  };

  return (
    <div className="hotel">
      <img src={props.item.image_url} alt=""></img>
      <a href="#" onClick={goToDetail}>
        <h4>{props.item.name}</h4>
      </a>
      <p>{props.item.city}</p>
      <p>
        <strong>Starting from ${props.item.price}</strong>
      </p>
      <div>
        <span>{props.item.rate}</span> {props.item.type}
      </div>
    </div>
  );
};

export default Hotel;
