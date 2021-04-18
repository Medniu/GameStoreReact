import { ReactElement, useState, useEffect } from "react";
import axios from "axios";
import CategoryBox from "../CategoryBox/CategoryBox";
import Container from "../Container/Container";
import GameCard from "../GameCard/GameCard";

import "./Home.css";

interface TopGames {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
}

function Home(): ReactElement {
  const [topGames, setTopGames] = useState<TopGames[]>([]);

  const top3Games = topGames.map((game) => (
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
    axios.get("/api/getTopProducts").then((response) => {
      const gameList = response.data;
      setTopGames(gameList);
    });
  }, []);

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
