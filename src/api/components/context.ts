import React from "react";

type User = {
  photo: string;
  login: string;
  address: string;
  phoneNumber: string;
};
type IUser = {
  user: User | null;
  setUser: (active: User | null) => void;
};
const UserContext = React.createContext<IUser>({ user: null, setUser: () => null });

export default UserContext;
