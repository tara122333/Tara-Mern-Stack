import { SIGN_UP,SIGN_IN, GOOGLE_AUTH,OTP } from "./auth.type";
const INITIAL_STATE = {};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
      };

    case SIGN_IN:
      return {
        ...state,
      };
    case GOOGLE_AUTH:
      return {
        ...state,
      };
    case OTP:
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

export default AuthReducer;