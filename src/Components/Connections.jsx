import axios from "axios";
import React, { useEffect } from "react";
import { CONNECTIONS } from "../utils/apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionReducer";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      let result = await axios.get(CONNECTIONS, { withCredentials: true });
      dispatch(addConnections(result.data));
    } catch (error) {
      console.log("error", error);
    }
  };
  if (connections?.length == 0) {
    return "No Connections";
  }
  return (
    <div className="my-10 w-100 mx-auto">
      {connections?.map((con) => (
        <div className="bg-base-300 w-100 my-3 flex">
          <div className="p-4">
            <img
              src={con?.profileUrl}
              className="h-10 w-10 rounded-xl"
              alt="img"
            />
          </div>
          <div className="p-4">
            <p>{con?.firstName + " " + con?.lastName}</p>
            <p>{con?.about}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
