import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-spinners-css";
import axios from "axios";
import Container from "../Container/Container";
import SearchBar from "../SearchBar/SearchBar";
import GameCard from "../GameCard/GameCard";
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

function Products(): ReactElement {
  const [searchTerm, setSearchTerm] = useState("");
  const [gameCards, setGameCards] = useState<Item[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceSearchTerm = useDebounce(searchTerm, 300);

  const category = useParams<Params>();

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
      .get("/api/getGames", { params: { text: searchTerm, category: category.category.toUpperCase() } })
      .then((response) => {
        const gameList = response.data;
        setGameCards(gameList);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/getGames", { params: { text: debounceSearchTerm, category: category.category.toUpperCase() } })
      .then((response) => {
        const gameList = response.data;
        setIsSearching(false);
        setGameCards(gameList);
      });
  }, [debounceSearchTerm, category.category]);

  return (
    <div>
      <Container>
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
