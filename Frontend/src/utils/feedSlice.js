import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : [],
    reducers : {
        addFeed : (state,action) => {
            return action.payload
        },
        removeFeedData : (state, action) => {
            // let filteredArray = state.data.filter((item) => {
            //     return item._id != action.payload.id
            // })
            // return filteredArray

            return state.data.slice(1)
        }
    }
})

export default feedSlice.reducer
export const{addFeed, removeFeedData} = feedSlice.actions