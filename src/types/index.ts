interface TopGames {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
}

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
  genre: string;
  age: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  isSelected: boolean;
};

type User = {
  photo: string;
  login: string;
  address: string;
  phoneNumber: string;
};

type AuthState = {
  user: User | null | undefined;
};

type CartState = {
  items: Array<CartItem>;
  total: number;
};

type AllState = {
  auth: AuthState;
  cart: CartState;
};

type AuthAction = {
  type: string;
  payload: User | null | undefined;
};

type CartAction = {
  type: string;
  payload: Item | null | undefined;
};
export { User, AuthState, AllState, TopGames, Params, Item, AuthAction, CartState, CartAction, CartItem };
