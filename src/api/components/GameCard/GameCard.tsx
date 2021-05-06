import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllState } from "@/types";
import axios from "axios";
import Modal from "../Modal/Modal";
import DropDown from "../DropDown/DropDown";
import InputText from "../../../elements/inputText";
import "./GameCard.css";
import plusIcon from "../../assets/images/Plus.png";

interface ContainerProps {
  id: number;
  imageLink: string;
  name: string;
  rating: number;
  age: string;
  genre: string;
  cost: number;
  category: string;
  isItemUpdate: boolean;
  setIsItemUpdate: (action: boolean) => void;
}

function GameCard({
  id,
  imageLink,
  name,
  rating,
  cost,
  category,
  genre,
  age,
  isItemUpdate,
  setIsItemUpdate,
}: ContainerProps): ReactElement {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gameName, setGameName] = useState(name);
  const [platform, setPlatform] = useState(category);
  const [gameGenre, setGameGenre] = useState(genre);
  const [gameRate, setGameRate] = useState(age.toString());
  const [price, setPrice] = useState(cost.toString());
  const dispatch = useDispatch();
  const user = useSelector((state: AllState) => state.auth.user);
  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { id, name: gameName, price: +price, category: platform } });
  };
  const uploadPicture = useCallback(() => {
    alert("Upload picture");
  }, []);
  const saveChanges = useCallback(() => {
    if (gameName && price) {
      axios
        .put("/api/product", { id, name: gameName, category: platform, genre: gameGenre, age: gameRate, price })
        .then(({ data }) => {
          const productId: number = data;
          console.log(productId);
          setModalIsOpen(false);
          setIsItemUpdate(!isItemUpdate);
        });
    } else {
      alert("Check input data and try again");
    }
  }, [gameName, price, platform, gameGenre, gameRate]);
  const deleteItem = useCallback(() => {
    const conf = window.confirm(`Are you sure  you want to delete the product ${name} ?`);
    if (conf === true) {
      axios
        .delete(`/api/product/`, {
          params: { id },
        })
        .then(() => {
          setIsItemUpdate(!isItemUpdate);
        });
    }
  }, [id]);
  return (
    <>
      <div className="game-card-container">
        <div className="image-container">
          <img src={imageLink} alt="searchLogo" className="image-container" />
        </div>
        <div className="name-container">
          <p>{name}</p>
          <p>Rating: {rating}</p>
        </div>
        {user &&
          (user.role === "admin" ? (
            <div className="add-button-container">
              <button className="update-item-button" type="button" onClick={() => setModalIsOpen(true)}>
                Update
              </button>
              <button className="remove-item-button" type="button" onClick={() => deleteItem()}>
                Remove
              </button>
            </div>
          ) : (
            <div className="add-button-container">
              <img className="plus-img" src={plusIcon} alt="fireSpot" onClick={() => addToCart()} />
            </div>
          ))}
        <div className="price">
          <p> {cost} BYN</p>
        </div>
      </div>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="modal-body">
          <div className="game-info-container">
            <div className="photo-info-container">
              <div className="photo-container">
                <img src={imageLink} alt="searchLogo" className="game-image-container" />
              </div>
              <div className="game-container">
                <div className="criteria-container">
                  <div>Name: </div>
                  <InputText
                    value={gameName}
                    setInputField={setGameName}
                    name="price"
                    type="price"
                    placeholder="Input price"
                  />
                </div>
                <div className="criteria-container">
                  <DropDown
                    dropDownName="Platform:"
                    currentValue={platform}
                    optionalList={["Ps4", "PC", "Xbox"]}
                    changeSortType={setPlatform}
                  />
                </div>
                <div className="criteria-container">
                  <DropDown
                    dropDownName="Genre:"
                    currentValue={gameGenre}
                    optionalList={["Racing", "Sport", "Shooter", "Strategy"]}
                    changeSortType={setGameGenre}
                  />
                </div>
                <div className="criteria-container">
                  <DropDown
                    dropDownName="Rating:"
                    currentValue={gameRate.toString()}
                    optionalList={["6", "12", "18"]}
                    changeSortType={setGameRate}
                  />
                </div>
                <div className="criteria-container">
                  <div>Price: </div>
                  <InputText
                    value={price.toString()}
                    setInputField={setPrice}
                    name="price"
                    type="price"
                    placeholder="Input price"
                  />
                </div>
                <div className="field-container">General Score: {rating}</div>
              </div>
            </div>
            <div className="buttons-container">
              <div>
                <button className="new-game-button" type="button" onClick={() => uploadPicture()}>
                  Upload picture
                </button>
                <button className="new-game-button" type="button" onClick={() => saveChanges()}>
                  Save
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

export default React.memo(GameCard);
