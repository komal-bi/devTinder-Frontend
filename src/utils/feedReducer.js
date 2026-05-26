import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: { list: [] },
  reducers: {
    addFeedList(state, action) {
      state.list = action.payload;
    },
    removeUserFromList(state, action) {
      const index = state.list.findIndex((ele) => ele._id == action.payload);
      if (index !== -1) state.list.splice(index, 1);
    },
  },
});

export const { addFeedList, removeUserFromList } = feedSlice.actions;
const feedReducer = feedSlice.reducer;
export default feedReducer;
