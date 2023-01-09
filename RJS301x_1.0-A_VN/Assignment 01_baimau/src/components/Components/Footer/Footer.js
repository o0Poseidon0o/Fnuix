// Khai báo thư viện
import React, { useState } from "react";
import Container from "../../UI/Container";
import "./Footer.css";
import ColFooter from "./ColFooter";

// Cấu trúc component footer
const Footer = () => {
  const footers = require("../../../data/footer.json");
  return (
    <Container className="footer">
      {footers.map((col) => (
        <ColFooter key={col.col_number} item={col.col_values} />
      ))}
    </Container>
  );
};

export default Footer;
