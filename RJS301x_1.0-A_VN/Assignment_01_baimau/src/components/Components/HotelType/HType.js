import React from "react";
import Card from "../../UI/Card";
import "./HType.css";

// Cấu trúc mỗi một thẻ hotel-type
const HType = (props) => {
  return (
    <Card className="htype">
      <img src={props.item.image} alt=""></img>
      <div>
        <h4>{props.item.name}</h4>
        <p>{props.item.count} hotels</p>
      </div>
    </Card>
  );
};

export default HType;
