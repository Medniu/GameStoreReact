import React from "react";
import ReactDOM from "react-dom";
import { CartItem, CartState, Item } from "@/types";
import App from "../api/components/App";
import About from "../api/components/About/About";
import cartReducer from "../redux/reducers/cartReducer";

describe("cartReducer tests", () => {
  it("It should add new item to cart", () => {
    const state: CartState = {
      items: [],
      total: 0,
    };
    const newCartItem: Item = {
      id: 1,
      name: "Witcher",
      price: 80,
      category: "PC",
      description: "das",
      rating: 5,
      image: "dasdas",
      genre: "shooter",
      age: "18",
    };
    const newState = cartReducer(state, {
      type: "ADD_TO_CART",
      payload: newCartItem,
    });

    expect(newState.items.length).toBe(1);
  });
  it("It should buy items and remove them from cart", () => {
    const state: CartState = {
      items: [
        {
          id: 0,
          name: "Witcher",
          price: 80,
          category: "PC",
          quantity: 2,
          isSelected: true,
        },
        {
          id: 1,
          name: "Witcher 2",
          price: 30,
          category: "PC",
          quantity: 1,
          isSelected: true,
        },
        {
          id: 2,
          name: "Witcher",
          price: 50,
          category: "PC",
          quantity: 2,
          isSelected: true,
        },
      ],
      total: 290,
    };
    const newState = cartReducer(state, {
      type: "BUY_ITEMS",
      payload: null,
    });

    expect(newState.items.length).toBe(0);
    expect(newState.total).toBe(0);
  });
  it("It should change isSelected to true", () => {
    const state: CartState = {
      items: [
        {
          id: 0,
          name: "Witcher",
          price: 80,
          category: "PC",
          quantity: 2,
          isSelected: false,
        },
        {
          id: 1,
          name: "Witcher 2",
          price: 30,
          category: "PC",
          quantity: 1,
          isSelected: false,
        },
      ],
      total: 190,
    };
    const newSelectedCartItem: Item = {
      id: 1,
      name: "Witcher",
      price: 80,
      category: "PC",
      description: "das",
      rating: 5,
      image: "dasdas",
      genre: "shooter",
      age: "18",
    };
    const newState = cartReducer(state, {
      type: "SELECT_ITEM",
      payload: newSelectedCartItem,
    });
    const updatedItem = newState.items.find((item) => item.id === newSelectedCartItem.id);
    expect(updatedItem?.isSelected).toBe(true);
    expect(state).toMatchSnapshot();
    expect(newState).toMatchSnapshot();
    expect(updatedItem).toMatchSnapshot();
  });
});
