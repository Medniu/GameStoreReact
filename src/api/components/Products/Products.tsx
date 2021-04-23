import React, { ReactElement, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Spinner } from "react-spinners-css";
import axios from "axios";
import InputText from "@/elements/inputText";
import Container from "../Container/Container";
import SearchBar from "../SearchBar/SearchBar";
import GameCard from "../GameCard/GameCard";
import Modal from "../Modal/Modal";
import useDebounce from "./useDebounce";

interface Params {
  category: string;
}

type Item = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  image: string;
};

type User = {
  photo: string;
  name: string;
  address: string;
  phoneNumber: string;
};

interface ContainerProps {
  user: User | null;
  setUser: (active: User | null) => void;
}

function Products({ user, setUser }: ContainerProps): ReactElement {
  const [searchTerm, setSearchTerm] = useState("");
  const [gameCards, setGameCards] = useState<Item[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceSearchTerm = useDebounce(searchTerm, 300);

  const { category } = useParams<Params>();

  const listGames = gameCards.map((game) => (
    <GameCard
      key={game.id}
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
      .get("/api/getGames", { params: { text: debounceSearchTerm, category: category.toUpperCase() } })
      .then((response) => {
        const gameList = response.data;
        setIsSearching(false);
        setGameCards(gameList);
      });
  }, [debounceSearchTerm, category]);

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(true);

  const history = useHistory();

  const onLoginClick = () => {
    console.log("Clicked");
    axios.post("/auth/signIn").then((response) => {
      const userProfile: User = response.data;
      setUser(userProfile);
    });
    setLoginModalIsOpen(false);
    history.push(category);
  };

  if (!user && loginModalIsOpen === true) {
    return (
      <Modal open={loginModalIsOpen} onClose={setLoginModalIsOpen}>
        <div className="modal-body">
          <h2>
            Login and Get <span>Started</span>
          </h2>
          <form className="contact-form form-validate4">
            <InputText name="email" type="email" placeholder="email" />
            <InputText name="password" type="password" placeholder="password" />
            <input
              className="submit-button"
              id="login_btn"
              type="button"
              value="Sign In"
              onClick={() => onLoginClick()}
            />
          </form>
        </div>
      </Modal>
    );
  }
  return (
    <div>
      <Container user={user} setUser={setUser}>
        <div className="search-bar">
          <SearchBar
            searchTerm={searchTerm}
            isSearching={isSearching}
            setSearchTerm={setSearchTerm}
            setIsSearching={setIsSearching}
          />
        </div>
        <div className="game-list"> {isSearching ? <Spinner /> : listGames}</div>
      </Container>
    </div>
  );
}

export default Products;
