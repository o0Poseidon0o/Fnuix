import React from "react";
import "./Hotels.css";
import Container from "../../UI/Container";
import Hotel from "./Hotel";

const Hotels = () => {
  // Lấy dữ liệu từ file hotels
  const hotels = require("../../../data/hotel_list.json");

  return (
    <Container>
      <h3>Homes guests love</h3>
      <div className="hotels">
        {hotels.map((hotel) => (
          <Hotel key={hotel.name} item={hotel} />
        ))}
      </div>
    </Container>
  );
};

export default Hotels;
