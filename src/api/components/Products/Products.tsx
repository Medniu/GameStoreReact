import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-spinners-css";
import axios from "axios";
import { AllState, Item, Params } from "@/types";
import { useSelector } from "react-redux";
import Container from "../Container/Container";
import SearchBar from "../SearchBar/SearchBar";
import GameCard from "../GameCard/GameCard";
import useDebounce from "./useDebounce";
import InputText from "../../../elements/inputText";
import "./Product.css";
import DropDown from "../DropDown/DropDown";
import RadioButtonForm from "../RadioButton/RadioButtonForm";
import Modal from "../Modal/Modal";

function Products(): ReactElement {
  const [searchTerm, setSearchTerm] = useState("");
  const [gameCards, setGameCards] = useState<Item[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("Rating");
  const [sortType, setSortType] = useState("Desc");
  const [genreFilter, setGenreFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [isItemUpdate, setIsItemUpdate] = useState(false);
  const debounceSearchTerm = useDebounce(searchTerm, 300);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newGameName, setNewGameName] = useState("");
  const [newGameCategory, setNewGameCategory] = useState("Ps4");
  const [newGameGenre, setNewGameGenre] = useState("Racing");
  const [newGameAgeRating, setNewGameAgeRating] = useState("6");
  const [newGamePrice, setNewGamePrice] = useState("");
  const [newGameImgUrl, setNewGameImgUrl] = useState("");

  const { category } = useParams<Params>();
  const user = useSelector((state: AllState) => state.auth.user);
  const uploadPicture = useCallback(() => {
    setNewGameImgUrl(
      "https://upload.wikimedia.org/wikipedia/ru/thumb/a/a2/The_Witcher_3-_Wild_Hunt_Cover.jpg/266px-The_Witcher_3-_Wild_Hunt_Cover.jpg"
    );
  }, [newGameImgUrl]);

  const createGame = useCallback(() => {
    if (newGameName && newGamePrice && newGameCategory) {
      axios
        .post("/api/product", {
          name: newGameName,
          category: newGameCategory,
          genre: newGameGenre,
          age: newGameAgeRating,
          price: newGamePrice,
          image: newGameImgUrl,
        })
        .then(({ data }) => {
          setModalIsOpen(false);
          setIsItemUpdate(!isItemUpdate);
        });
    } else {
      alert("Check input data and try again");
    }
  }, [newGamePrice, newGameName, newGameImgUrl, newGameCategory, newGameGenre, newGameAgeRating]);
  const listGames = gameCards.map((game) => (
    <GameCard
      key={game.id}
      id={game.id}
      name={game.name}
      cost={game.price}
      imageLink={game.image}
      age={game.age}
      genre={game.genre}
      category={game.category}
      rating={game.rating}
      isItemUpdate={isItemUpdate}
      setIsItemUpdate={setIsItemUpdate}
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
  }, [debounceSearchTerm, category, sortCriteria, sortType, genreFilter, ageFilter, isItemUpdate]);
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
                {user?.role === "admin" && (
                  <button type="button" className="new-game-button" onClick={() => setModalIsOpen(true)}>
                    Create new game
                  </button>
                )}
              </div>
              <div className="game-list"> {isSearching ? <Spinner /> : listGames}</div>
            </div>
          </div>
        </Container>
      </div>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="modal-body">
          <div className="game-info-container">
            <div className="photo-info-container">
              <div className="photo-container">
                <img src={newGameImgUrl} alt="searchLogo" className="game-image-container" />
              </div>
              <div className="game-container">
                <div className="criteria-container">
                  <div>Name: </div>
                  <InputText
                    value={newGameName}
                    setInputField={setNewGameName}
                    name="name"
                    type="name"
                    placeholder="Input name"
                  />
                </div>
                <div className="criteria-container">
                  <DropDown
                    dropDownName="Platform:"
                    currentValue={newGameCategory}
                    optionalList={["Ps4", "PC", "Xbox"]}
                    changeSortType={setNewGameCategory}
                  />
                </div>
                <div className="criteria-container">
                  <DropDown
                    dropDownName="Genre:"
                    currentValue={newGameGenre}
                    optionalList={["Racing", "Sport", "Shooter", "Strategy"]}
                    changeSortType={setNewGameGenre}
                  />
                </div>
                <div className="criteria-container">
                  <DropDown
                    dropDownName="Rating:"
                    currentValue={newGameAgeRating}
                    optionalList={["6", "12", "18"]}
                    changeSortType={setNewGameAgeRating}
                  />
                </div>
                <div className="criteria-container">
                  <div>Price: </div>
                  <InputText
                    value={newGamePrice}
                    setInputField={setNewGamePrice}
                    name="price"
                    type="price"
                    placeholder="Input price"
                  />
                </div>
              </div>
            </div>
            <div className="buttons-container">
              <div>
                <button className="new-game-button" type="button" onClick={() => uploadPicture()}>
                  Upload picture
                </button>
                <button className="new-game-button" type="button" onClick={() => createGame()}>
                  Add
                </button>
              </div>
              <div>
                <button className="new-game-button" type="button" onClick={() => setModalIsOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default React.memo(Products);
