import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllState } from "@/types";
import Container from "../Container/Container";
import "./ShoppingCart.css";

function ShoppingCart(): ReactElement {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: AllState) => state.cart.items);
  const totalSum = useSelector((state: AllState) => state.cart.total);

  const onSelectClick = (cartId: number) => {
    dispatch({ type: "SELECT_ITEM", payload: { id: cartId } });
  };
  const buyItems = () => {
    dispatch({ type: "BUY_ITEMS" });
    alert("Thank you for your purchase");
  };
  const removeItems = () => {
    dispatch({ type: "REMOVE_ITEMS" });
  };
  const increaseQuantity = (cartId: number) => {
    dispatch({ type: "ADD_QUANTITY", payload: { id: cartId } });
  };
  const decreaseQuantity = (cartId: number) => {
    dispatch({ type: "REMOVE_QUANTITY", payload: { id: cartId } });
  };

  return (
    <Container>
      <>
        <div className="cart-container">
          <h2 className="table-header"> Order List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Platform</th>
                <th>Amount</th>
                <th>Price</th>
                <th>{"  "}</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td> <td>{item.category}</td>{" "}
                  <td>
                    <div className="quantity-container">
                      <div className="quantity-value">{item.quantity}</div>
                      <div className="quantity-buttons-container">
                        <button type="button" className="quantity-button" onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                        <button type="button" className="quantity-button" onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>
                      </div>
                    </div>
                  </td>{" "}
                  <td>{item.price}</td>
                  <td>
                    <input type="checkbox" checked={item.isSelected} onChange={() => onSelectClick(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="order-container">
            <div className="billing-container">
              <div>Your balance: 0</div>
              <div>Total:{totalSum}</div>
            </div>
            <div className="button-container">
              <button className="buy-button" type="button" onClick={buyItems}>
                Buy
              </button>
              <button className="remove-button" type="button" onClick={removeItems}>
                Remove
              </button>
            </div>
          </div>
        </div>
      </>
    </Container>
  );
}

export default React.memo(ShoppingCart);
