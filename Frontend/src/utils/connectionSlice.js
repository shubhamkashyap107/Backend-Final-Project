import { createSlice } from "@reduxjs/toolkit";

const connectionSLice = createSlice({
    name : "Connection",
    initialState : [],
    reducers : {
        addConnections : (state, action) => {
            return action.payload
        }
    }
})


export default connectionSLice.reducer
export const{addConnections} = connectionSLice.actions