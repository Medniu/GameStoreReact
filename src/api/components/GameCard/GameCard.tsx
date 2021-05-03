import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, AllState } from "@/types";
import "./GameCard.css";
import plusIcon from "../../assets/images/Plus.png";

interface ContainerProps {
  id: number;
  imageLink: string;
  name: string;
  rating: number;
  cost: number;
  category: string;
  description: string;
}

function GameCard({ id, imageLink, name, rating, cost, category, description }: ContainerProps): ReactElement {
  const dispatch = useDispatch();
  const user = useSelector((state: AllState) => state.auth.user);
  const AddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { id, name, price: cost, category } });
  };

  return (
    <div className="game-card-container">
      <div className="image-container">
        <img src={imageLink} alt="searchLogo" className="image-container" />
      </div>
      <div className="name-container">
        <p>{name}</p>
        <p>Rating: {rating}</p>
      </div>
      {user && (
        <div className="add-button-container">
          <img className="plus-img" src={plusIcon} alt="fireSpot" onClick={() => AddToCart()} />
        </div>
      )}
      <div className="price">
        <p> {cost} BYN</p>
      </div>
    </div>
  );
}

export default GameCard;
