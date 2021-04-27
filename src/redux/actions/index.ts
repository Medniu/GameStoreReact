import { User } from "@/types";

const signIn = (user: User) => ({
  type: "SIGN_IN",
  payload: user,
});

const updateUser = (user: User) => ({
  type: "UPDATE_USER",
  payload: user,
});

const signOut = () => ({
  type: "SIGN_OUT",
  payload: null,
});

export default {
  signIn,
  signOut,
  updateUser,
};
