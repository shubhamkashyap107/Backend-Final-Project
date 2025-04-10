import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import connectionsReducer from "./connectionSlice"


const store = configureStore({
    reducer : {
        user : userReducer,
        connection : connectionsReducer
    }
})


export default store