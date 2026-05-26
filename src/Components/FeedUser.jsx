import React, { useState } from "react";
import { REQUEST_SEND } from "../utils/apiUrl";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromList } from "../utils/feedReducer";

const FeedUser = ({ user }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const statusHandler = async (status) => {
    try {
      let result = await axios.post(`${REQUEST_SEND}/${status}/${user._id}`,{},{withCredentials:true});
      console.log("user",user)
      dispatch(removeUserFromList(user?._id));
      setError('')
    } catch (error) {
      setError(error?.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 2000);
      console.log("error", error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div class="$$card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={user?.profileUrl} alt="photo" />
        </figure>
        <div class="$$card-body text-center mt-1">
          <h2 class="$$card-title">{user?.firstName + " " + user?.lastName}</h2>
          <p>{user?.about}</p>
        </div>
        <div className="text-center mx-auto my-3">
          <button
            className="btn btn-secondary me-2"
            onClick={() => {
              statusHandler("ignored");
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              statusHandler("interested");
            }}
          >
            Interested
          </button>
        </div>
      </div>
      {error && (
            <div className="toast toast-top toast-end">
              <div className="alert alert-info">
                <span>{error}</span>
              </div>
            </div>
          )}
    </div>
  );
};

export default FeedUser;
