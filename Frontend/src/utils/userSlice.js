import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "User",
    initialState : {},
    reducers : {
        addUser : (state, action) => {
            const user = action.payload
            return user
        },
        removeUser : () => {
            return null
        }
    }
})

export default userSlice.reducer
export const{addUser, removeUser} = userSlice.actions