//Khai báo thư viện
import React from "react";
import "./City.css";
import Card from "../../UI/Card";

//Cấu trúc component city
const City = (props) => {
  return (
    <Card className="city">
      <img src={props.item.image} alt=""></img>
      <div className="city-detail">
        <h1>{props.item.name}</h1>
        <p>{props.item.subText}</p>
      </div>
    </Card>
  );
};

export default City;
