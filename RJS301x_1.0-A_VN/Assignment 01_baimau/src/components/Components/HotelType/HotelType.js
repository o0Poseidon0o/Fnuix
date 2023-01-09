import React from "react";
import "./HotelType.css";
import Container from "../../UI/Container";
import HType from "./HType";

const HotelType = () => {
  // lấy dữ liệu từ file json
  const hotelType = require("../../../data/type.json");

  return (
    <Container>
      <h3>Browse by property type</h3>
      <div className="hotel-type">
        {hotelType.map((type) => (
          <HType key={type.name} item={type} />
        ))}
      </div>
    </Container>
  );
};

export default HotelType;
