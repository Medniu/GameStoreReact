import { ReactElement, useState, useEffect } from "react";
import axios from "axios";
import { TopGames } from "@/types";
import CategoryBox from "../CategoryBox/CategoryBox";
import Container from "../Container/Container";
import GameCard from "../GameCard/GameCard";
import "./Home.css";

function Home(): ReactElement {
  const [topGames, setTopGames] = useState<TopGames[]>([]);
  const [isItemUpdate, setIsItemUpdate] = useState(false);
  const top3Games = topGames.map((game) => (
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
    axios.get("/api/getTopProducts").then((response) => {
      const gameList = response.data;
      setTopGames(gameList);
    });
  }, [isItemUpdate]);

  return (
    <div>
      <Container>
        <div className="category-list">
          <CategoryBox link="/products/Ps" categoryName="PS" />
          <CategoryBox link="/products/Xbox" categoryName="Xbox" />
          <CategoryBox link="/products/Pc" categoryName="PC" />
        </div>
        <div>
          <h1>Most Popular Games</h1>
        </div>
        <div className="game-list">{top3Games}</div>
      </Container>
    </div>
  );
}

export default Home;
