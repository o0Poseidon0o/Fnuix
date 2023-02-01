// Khai báo thư viện
import React from "react";
import City from "./City";
import "./Cities.css";
import Container from "../../UI/Container";

//Hàm render các thành phố
const Cities = () => {
  //Lấy dữ liệu từ file json
  const cities = require("../../../data/city.json");
  return (
    <Container className="cities">
      {cities.map((city) => (
        //Gọi component city
        <City key={city.name} item={city}></City>
      ))}
    </Container>
  );
};

export default Cities;
