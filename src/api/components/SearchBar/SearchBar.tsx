import { ReactElement } from "react";
import "./SearchBar.css";
import searchLogo from "../../assets/images/search.png";

interface ContainerProps {
  searchTerm: string;
  isSearching: boolean;
  setSearchTerm: (search: string) => void;
  setIsSearching: (active: boolean) => void;
}

function SearchBar({ searchTerm, isSearching, setSearchTerm, setIsSearching }: ContainerProps): ReactElement {
  const inputClick = (search: string) => {
    if (isSearching === false) {
      setIsSearching(true);
    }
    console.log(search);
    setSearchTerm(search);
  };

  return (
    <div className="wrap">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Enter game name"
          onChange={(event) => {
            inputClick(event.target.value);
          }}
        />
        <button type="submit" className="searchButton">
          <img src={searchLogo} alt="searchLogo" className="searchLogo" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
