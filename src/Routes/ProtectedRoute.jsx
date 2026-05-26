import React from "react";
import { getCookie } from "../Services/helperFunctions";
import Login from "../Components/Login";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let auth = getCookie("token") ? true : false;
  return <React.Fragment>{auth ? <Outlet /> : <Login />}</React.Fragment>;
};

export default ProtectedRoute;
