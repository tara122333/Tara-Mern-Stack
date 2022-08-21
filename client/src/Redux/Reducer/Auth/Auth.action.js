import axios from "axios";


// Redux types
import { SIGN_UP,SIGN_IN,SIGN_OUT,GOOGLE_AUTH,OTP } from "./auth.type";

// redux actions
import { getMyself,clearUser } from "../User/user.action";

export const signUp = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      url: `http://localhost:4000/auth/signup`,
      data: { credentials: userData },
    });

    getMyself();

    localStorage.setItem(
      "zomatoUser",
      JSON.stringify({ token: User.data.token })
    );
    return dispatch({ type: SIGN_UP, payload: User.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const signIn = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      url: `http://localhost:4000/auth/signin`,
      data: { credentials: userData },
    });

    getMyself();

    localStorage.setItem(
      "zomatoUser",
      JSON.stringify({ token: User.data.token })
    );

    return dispatch({ type: SIGN_IN, payload: User.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
export const UserOTP = (otpData) => async (dispatch) => {
  try {
    const Otp = await axios({
      method: "POST",
      url: `http://localhost:4000/auth/otp`,
      data: { otpData: otpData },
    });

    getMyself();

    localStorage.setItem(
      "zomatoUser",
      JSON.stringify({ token: Otp.data })
    );

    return dispatch({ type: OTP, payload: Otp.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("zomatoUser");
    clearUser();
    window.location.href = `http://localhost:3000`;
    
    return dispatch({ type: SIGN_OUT, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};


export const googleAuth = (token) => async (dispatch) => {
  try {
    localStorage.setItem("zomatoUser", JSON.stringify({ token }));

    getMyself();

    return dispatch({ type: GOOGLE_AUTH, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};