import React, { useEffect } from "react";
import { useParams} from "react-router-dom";
import { useDispatch } from "react-redux";

// redux action
import { googleAuth } from "../Redux/Reducer/Auth/auth.action";

const GoogleAuth = () => {
  const { token } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(googleAuth(token)).then(() => 
      (window.location.href = "/")
      );
    }
  }, [token]);

  return <>Loading, Please wait. </>;
};

export default GoogleAuth;