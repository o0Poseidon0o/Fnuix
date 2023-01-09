// Khai báo thư viện
import React from "react";
import BlueContainer from "../../UI/BlueContainer";
import "./Header.css";
import HeaderSearhcBar from "./HeaderSearchBar";
import Container from "../../UI/Container";

// Cấu trúc phần header
const Header = () => {
  return (
    <BlueContainer>
      <Container>
        <div className="header-description">
          <h1>A lifetime of discounts? It's Genius.</h1>
          <p>
            Get rewarded for your travels - unlock instant savings of 10% or
            more with a free account
          </p>
          <button>Sign in / Registter</button>
        </div>
      </Container>
      {/* Thanh tìm kiếm */}
      <HeaderSearhcBar />
    </BlueContainer>
  );
};

export default Header;
