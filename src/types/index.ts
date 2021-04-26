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

type AllState = {
  auth: AuthState;
};

type Action = {
  type: string;
  payload: User | null | undefined;
};

export { User, AuthState, AllState, TopGames, Params, Item, Action };
