import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import feedReducer from "./feedReducer";
import connectionReducer from "./connectionReducer";
import requestReducer from "./requestReducer";

const store=configureStore({
    reducer:{
       user: userReducer,
       feed:feedReducer,
       connection:connectionReducer,
       request:requestReducer
    }
})

export default store;