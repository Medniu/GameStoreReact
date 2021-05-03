import { CartState, CartAction, CartItem } from "../../types";

const INITIAL_STATE: CartState = {
  items: [],
  total: 0,
};

export default (state = INITIAL_STATE, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existedItem = state.items.find((item) => action.payload?.id === item.id);
      if (existedItem && action.payload) {
        existedItem.quantity += 1;
        return {
          ...state,
          total: state.total + action.payload?.price,
        };
      }
      if (action.payload) {
        const newTotal = state.total + action.payload?.price;
        const newCartItem: CartItem = {
          id: action.payload?.id,
          name: action.payload?.name,
          price: action.payload?.price,
          category: action.payload?.category,
          quantity: 1,
          isSelected: false,
        };
        return { ...state, items: [...state.items, newCartItem], total: newTotal };
      }
      return state;
    }

    case "BUY_ITEMS": {
      const newList: Array<CartItem> = [];

      return { ...state, items: newList, total: 0 };
    }
    case "REMOVE_ITEMS": {
      const newList = state.items.filter((item) => item.isSelected === false);
      if (newList) {
        let newTotal = 0;
        newList.forEach((item) => {
          newTotal += item.price * item.quantity;
        });
        return { ...state, items: newList, total: newTotal };
      }
      return state;
    }
    case "ADD_QUANTITY": {
      const addedItem = state.items.find((item) => action.payload?.id === item.id);
      if (addedItem) {
        addedItem.quantity += 1;
        const newTotal = state.total + addedItem.price;
        return {
          ...state,
          total: newTotal,
        };
      }
      return state;
    }
    case "REMOVE_QUANTITY": {
      const removedItem = state.items.find((item) => action.payload?.id === item.id);
      if (removedItem?.quantity === 1) {
        const newList = state.items.filter((item) => action.payload?.id !== item.id);
        let newTotal = 0;
        newList.forEach((item) => {
          newTotal += item.price * item.quantity;
        });
        return { ...state, items: newList, total: newTotal };
      }
      if (removedItem && removedItem.quantity >= 1) {
        removedItem.quantity -= 1;
        const newTotal = state.total - removedItem.price;
        return {
          ...state,
          total: newTotal,
        };
      }
      return state;
    }
    case "SELECT_ITEM": {
      const selectedItem = state.items.find((item) => action.payload?.id === item.id);
      if (selectedItem) {
        selectedItem.isSelected = !selectedItem.isSelected;
        return { ...state, items: [...state.items] };
      }
      return state;
    }
    default:
      return state;
  }
};
