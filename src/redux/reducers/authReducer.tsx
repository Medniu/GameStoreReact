import { AuthState, Action } from "../../types";

const INITIAL_STATE: AuthState = {
  user: null,
};

export default (state = INITIAL_STATE, action: Action): AuthState => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "SIGN_OUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
