import { Navigate } from "react-router-dom";

import React from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((state)=>state.LoginReducer.isAuth);

  
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default PrivateRoute;