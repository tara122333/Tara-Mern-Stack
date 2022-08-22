import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {Route,Routes} from 'react-router-dom';


import GoogleAuth from "./Page/GoogleAuth";

// redux action
import { getMyself } from "./Redux/Reducer/User/user.action";

// components
import Temp from "./Components/Temp";
import HomeHOC from "./HOC/Home.HOC";


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
        <HomeHOC exact path="/" element={Temp} />
        <HomeHOC path="/google/:token" exact element={GoogleAuth} />
    </>
  );
}

export default App;
