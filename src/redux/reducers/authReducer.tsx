import { AuthState, AuthAction } from "../../types";

const INITIAL_STATE: AuthState = {
  user: null,
};

export default (state = INITIAL_STATE, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "SIGN_OUT":
      return { ...state, user: null };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
