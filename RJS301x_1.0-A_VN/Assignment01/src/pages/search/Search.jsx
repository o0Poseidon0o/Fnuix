import SearchList from "../../components/Search/searchList";
import SearchPopop from "../../components/Search/searchPopop";

const Search = () => {
  return (
    <div className="container">
      <div className="row">
        <SearchPopop></SearchPopop>
        <SearchList></SearchList>
      </div>
    </div>
  );
};

export default Search;
