import { Navigate } from "react-router-dom";

import React from "react";

const PrivateRoute = ({ children }) => {
  const isAuth = true;
  
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default PrivateRoute;