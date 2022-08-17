import { SEND_MAIL } from "./mail.type";

const INITIAL_STATE = {
  mail: {},
};

const MailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_MAIL:
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

export default MailReducer;