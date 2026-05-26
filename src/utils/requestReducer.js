import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {list:[]},
  reducers: {
    addRequests(state, action) {
      state.list=action.payload;
    },
    removeRequestFromList(state, action) {
      const index = state.list.findIndex((ele) => ele._id == action.payload);
      if (index !== -1) state.list.splice(index, 1);
    },
  },
});

export const { addRequests, removeRequestFromList } = requestSlice.actions;
const requestReducer = requestSlice.reducer;
export default requestReducer;
