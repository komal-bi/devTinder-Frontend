import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../utils/apiUrl";
import { removeUser } from "../utils/userReducer";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await axios.post(LOGOUT, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to={"/feed"}>
          devTinder
        </Link>
      </div>
      {user ? (
        <div className="flex-none">
          <div className="dropdown dropdown-end mx-5">
            <span className="px-2">Welcome {user?.firstName}</span>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.profileUrl}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
