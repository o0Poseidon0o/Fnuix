import React from "react";
import "./SearchList";
import SearchList from "./SearchList";
import Container from "../../UI/Container";
import SearchPopup from "./SearchPopop";

const SearchPage = () => {
  return (
    <Container className="search-page">
      <SearchPopup />
      <SearchList />
    </Container>
  );
};

export default SearchPage;
