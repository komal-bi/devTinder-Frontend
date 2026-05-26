import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE } from "../utils/apiUrl";
import { addUser } from "../utils/userReducer";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmailId(user?.emailId);
    setAge(user?.age);
    setGender(user?.gender);
  }, [user]);

  const saveHandler = async () => {
    try {
      let payloadData = { firstName, lastName, emailId, age, gender };
      let result = await axios.patch(UPDATE_PROFILE, payloadData, {
        withCredentials: true,
      });
      dispatch(addUser(result?.data?.data));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 mb-20 gap-2">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Profile</h2>
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
            <legend className="fieldset-legend">Age :</legend>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input"
              placeholder="Enter age"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender :</legend>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input"
              placeholder="Enter gender"
            />
          </fieldset>
          <div className="text-center">
            <button className="btn btn-primary" onClick={saveHandler}>
              Save
            </button>
          </div>
        </div>
      </div>
       <div class="$$card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={user?.profileUrl} alt="photo" />
        </figure>
        <div class="$$card-body text-center mt-1">
          <h2 class="$$card-title">{user?.firstName + " " + user?.lastName}</h2>
          <p>{user?.age}</p>
          <p>{user?.profile}</p>
          <p>{user?.about}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
