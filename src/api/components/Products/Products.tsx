import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  login: string;
  address: string;
  phoneNumber: string;
};

interface ContainerProps {
  user: User | null;
  setUser: (active: User | null) => void;
}

function Products({ user, setUser }: ContainerProps): ReactElement {
  const [email, setEmail] = useState("");
  const [formPassword, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gameCards, setGameCards] = useState<Item[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceSearchTerm = useDebounce(searchTerm, 300);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(true);
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

  const onLoginClick = () => {
    if (email && formPassword) {
      axios.post("/auth/signIn", { login: email, password: formPassword }).then((response) => {
        const userProfile: User = response.data;
        setUser(userProfile);
      });
      setLoginModalIsOpen(false);
    } else {
      alert("Check input data and repeat");
    }
  };

  return (
    <>
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
      {!user && (
        <Modal open={loginModalIsOpen} onClose={setLoginModalIsOpen}>
          <div className="modal-body">
            <h2>
              Login and Get <span>Started</span>
            </h2>
            <form className="contact-form form-validate4">
              <InputText setInputField={setEmail} name="email" type="email" placeholder="email" />
              <InputText setInputField={setPassword} name="password" type="password" placeholder="password" />
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
      )}
    </>
  );
}

export default Products;
