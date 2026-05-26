import axios from "axios";
import React, { useEffect } from "react";
import { REQUEST_REVIEW, REQUESTS_RECEIVED } from "../utils/apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequestFromList } from "../utils/requestReducer";

const Requests = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const requests = useSelector((state) => state.request.list);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      let result = await axios.get(REQUESTS_RECEIVED, {
        withCredentials: true,
      });
      dispatch(addRequests(result.data));
    } catch (error) {
      console.log("error", error);
    }
  };

  const statusHandler = async (status,id) => {
    try {
      let result = await axios.post(`${REQUEST_REVIEW}/${status}/${id}`,{},{withCredentials:true});
      dispatch(removeRequestFromList(id));
    } catch (error) {
      console.log("error", error);
    }
  };
  if (requests?.length == 0) {
    return "No Requests Found";
  }
  return(
  <div className="mt-10 w-100 mx-auto">
    {requests?.map((req) => (
      <div className="bg-base-300 w-100 my-3 flex">
        <div className="p-4">
          <img
            src={req?.profileUrl}
            className="h-10 w-10 rounded-xl"
            alt="img"
          />
        </div>
        <div className="p-4">
          <p>{req?.firstName + " " + req?.lastName}</p>
          <p>{req?.about}</p>
          <div className="text-center mx-auto my-3">
          <button
            className="btn btn-secondary me-2"
            onClick={() => {
              statusHandler("rejected",req._id);
            }}
          >
            Reject
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              statusHandler("accepted",req._id);
            }}
          >
            Accept
          </button>
        </div>
        </div>
      </div>
    ))}
  </div>);
};

export default Requests;
