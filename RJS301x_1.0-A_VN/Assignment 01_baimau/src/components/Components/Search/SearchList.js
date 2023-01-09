import React from "react";
import "./SearchList.css";
import SearchItem from "./SearchItem";

const SearchList = () => {
  // Lấy dư liệu từ file json
  const searchs = require("../../../data/search.json");
  return (
    <div className="search-list">
      {searchs.map((item) => (
        <SearchItem key={item.name} item={item} />
      ))}
    </div>
  );
};

export default SearchList;
