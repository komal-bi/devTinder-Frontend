import { createSlice } from "@reduxjs/toolkit";

const connectionnSlice = createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addConnections(state,action)
        {
            return action.payload;
        }
    }
})

export const {addConnections}=connectionnSlice.actions;
const connectionReducer=connectionnSlice.reducer;
export default connectionReducer;