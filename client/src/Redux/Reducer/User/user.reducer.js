import { SELF } from "./user.type";

const INITIAL_STATE = {
  user: {},
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELF:
      return {
        ...state,
        user: action.payload,
      };
      
    default:
      return {
        ...state,
      };
  }
};

export default UserReducer;