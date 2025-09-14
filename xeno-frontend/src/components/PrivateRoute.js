import React from "react";
import { Route, Navigate } from "react-router-dom";

// A custom PrivateRoute to protect the routes
const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if the user is logged in

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
