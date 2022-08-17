import DefaultLayout from "./Layout/Default";
import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";



// redux action
import { getMyself } from "./Redux/Reducer/User/user.action";


if (localStorage.zomatoUser) {
  const { token } = JSON.parse(localStorage.zomatoUser);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}



function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (localStorage.zomatoUser) dispatch(getMyself());
  }, []);



  return (
    <>
      <DefaultLayout />
    </>
  );
}

export default App;
