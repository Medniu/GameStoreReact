import { ReactElement } from "react";
import "./GameCard.css";

interface ContainerProps {
  imageLink: string;
  name: string;
  rating: number;
  cost: number;
  category: string;
  description: string;
}

const AcceptClick = () => {
  alert("Get item");
};

const handleKeyDown = () => {
  alert("Get item");
};

function GameCard({ imageLink, name, rating, cost, category, description }: ContainerProps): ReactElement {
  return (
    <div className="game-card-container" onClick={AcceptClick} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      <div className="image-container">
        <img src={imageLink} alt="searchLogo" className="image-container" />
      </div>
      <div className="name-container">
        <p>{name}</p>
        <p>Rating {rating}</p>
      </div>
      <div className="price">
        <p> {cost} BYN</p>
      </div>
    </div>
  );
}

export default GameCard;
