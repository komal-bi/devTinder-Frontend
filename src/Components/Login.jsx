import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userReducer";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, SIGNUP_URL } from "../utils/apiUrl";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginError, setLoginError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      let result = await axios.post(
        LOGIN_URL,
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(result?.data));
      navigate("/feed");
      setLoginError("");
    } catch (error) {
      setLoginError(error?.response?.data?.message || "Something went wrong");
      setTimeout(() => {
        setLoginError("");
      }, 2000);
    }
  };

  const signupHandler = async () => {
    try {
      let result = await axios.post(
        SIGNUP_URL,
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      setIsLoginForm(true);
      setEmailId("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          {!isLoginForm ? (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name :</legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  placeholder="Enter first name"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name :</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  placeholder="Enter last name"
                />
              </fieldset>
            </>
          ) : null}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email :</legend>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input"
              placeholder="Enter email"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password :</legend>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter password"
            />
          </fieldset>
          <div className="card-actions justify-center py-1">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? loginHandler : signupHandler}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
          <div className="flex justify-center">
            {isLoginForm ? (
              <span
                className="text-red-700 font-bold"
                onClick={() => {
                  setIsLoginForm(false);
                }}
              >
                No account, please signup
              </span>
            ) : (
              <span
                className="text-red-700 font-bold"
                onClick={() => {
                  setIsLoginForm(true);
                }}
              >
                Please login, if you have account
              </span>
            )}
          </div>
          {isLoginError && (
            <div className="toast toast-top toast-end">
              <div className="alert alert-info">
                <span>{isLoginError}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
