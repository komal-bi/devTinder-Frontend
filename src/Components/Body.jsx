import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GET_PROFILE_URL } from "../utils/apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userReducer";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    if (!user) {
      try {
        let result = await axios.get(GET_PROFILE_URL, {
          withCredentials: true,
        });
        dispatch(addUser(result.data));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
