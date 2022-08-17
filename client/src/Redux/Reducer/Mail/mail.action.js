import axios from "axios";

import { SEND_MAIL } from "./mail.type";

export const mailSend = (mailData) => async (dispatch) => {
    try {
      const Mail = await axios({
        method: "POST",
        url: `http://localhost:4000/mail`,
        data: { mailData },
      });

      return dispatch({ type: SEND_MAIL, payload: Mail.data });
    } catch (error) {
      return dispatch({ type: "ERROR", payload: error });
    }
};