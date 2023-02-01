import React, { useState } from "react";
import BlueContainer from "../../UI/BlueContainer";
import NavItem from "./NavItem";
import "./NavBar.css";
import Container from "../../UI/Container";
const NavBar = () => {
  // Lấy dữ liệu từ file json
  const navItems = require("../../../data/navBar.json");

  // Biến active
  const [currentActive, setCurrentActive] = useState(navItems[0].type);

  // Thay đổi mục active
  const changeActive = (currentActive) => {
    setCurrentActive(currentActive);
  };

  // Sự kiện khi nhấn vào tiêu đề -> Booking Website
  const goToHome = (event) => {
    event.preventDefault();
    window.location.replace("/");
  };

  // Cấu trúc component navbar
  return (
    <BlueContainer>
      <Container className="navbar">
        <div className="navbar-header">
          <a href="#" onClick={goToHome}>
            Booking Website
          </a>
          <div>
            <button>Register</button>
            <button>Login</button>
          </div>
        </div>
        <div className="navbar-item">
          {navItems.map((navItem) => (
            <NavItem
              key={navItem.type}
              item={navItem}
              active={currentActive}
              onActive={changeActive}
            />
          ))}
        </div>
      </Container>
    </BlueContainer>
  );
};

export default NavBar;
