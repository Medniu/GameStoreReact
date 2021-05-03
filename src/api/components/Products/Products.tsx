import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-spinners-css";
import axios from "axios";
import { Item, Params } from "@/types";
import Container from "../Container/Container";
import SearchBar from "../SearchBar/SearchBar";
import GameCard from "../GameCard/GameCard";
import useDebounce from "./useDebounce";
import "./Product.css";
import DropDown from "../DropDown/DropDown";
import RadioButtonForm from "../RadioButton/RadioButtonForm";

function Products(): ReactElement {
  const [searchTerm, setSearchTerm] = useState("");
  const [gameCards, setGameCards] = useState<Item[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("Rating");
  const [sortType, setSortType] = useState("Desc");
  const [genreFilter, setGenreFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const debounceSearchTerm = useDebounce(searchTerm, 300);
  const { category } = useParams<Params>();
  const listGames = gameCards.map((game) => (
    <GameCard
      key={game.id}
      id={game.id}
      name={game.name}
      cost={game.price}
      imageLink={game.image}
      description={game.description}
      category={game.category}
      rating={game.rating}
    />
  ));
  useEffect(() => {
    axios
      .get("/api/getGames", {
        params: {
          text: debounceSearchTerm,
          category: category.toUpperCase(),
          criteria: sortCriteria,
          type: sortType,
          genre: genreFilter,
          age: ageFilter,
        },
      })
      .then((response) => {
        const gameList = response.data;
        setIsSearching(false);
        setGameCards(gameList);
      });
  }, [debounceSearchTerm, category, sortCriteria, sortType, genreFilter, ageFilter]);

  return (
    <>
      <div>
        <Container>
          <div className="product-page-container">
            <div className="filter-container">
              <div className="category-name-container">
                <h1>{category}</h1>
              </div>
              <div className="sort-container">
                <h2>Sort</h2>
                <div className="criteria-container">
                  <DropDown
                    dropDownName="Criteria:"
                    currentValue={sortCriteria}
                    optionalList={["Rating", "Price"]}
                    changeSortType={setSortCriteria}
                  />
                </div>
                <div className="criteria-container">
                  <DropDown
                    dropDownName="Type:"
                    currentValue={sortType}
                    optionalList={["Asc", "Desc"]}
                    changeSortType={setSortType}
                  />
                </div>
              </div>
              <div>
                <RadioButtonForm
                  name="Age"
                  currentValue={ageFilter}
                  optionalList={["All", "6", "12", "18"]}
                  changeFilterValue={setAgeFilter}
                />
              </div>
              <div>
                <RadioButtonForm
                  name="Genres"
                  currentValue={genreFilter}
                  optionalList={["All", "Sport", "Shooter", "Strategy", "Racing"]}
                  changeFilterValue={setGenreFilter}
                />
              </div>
            </div>
            <div className="content-container">
              <div className="search-bar">
                <SearchBar
                  searchTerm={searchTerm}
                  isSearching={isSearching}
                  setSearchTerm={setSearchTerm}
                  setIsSearching={setIsSearching}
                />
              </div>
              <div className="game-list"> {isSearching ? <Spinner /> : listGames}</div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Products;
