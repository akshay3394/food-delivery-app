import { createSlice } from "@reduxjs/toolkit";

let initialUserDetails = {
    sessionId: "",
    userId: "",
    name: ""
}

let userDetails = localStorage.getItem("USER_DETAILS")

if (userDetails) {
    initialUserDetails = JSON.parse(userDetails)
}



export const userSlice = createSlice({
    name: "user",
    initialState: initialUserDetails,
    reducers: {
        setUserDetails: (state, action) => {
            const userDetails = action.payload
            return userDetails;
        },
        removeUserDetails: (state, action) => {
            return {
                sessionId: "",
                userId: "",
                name: ""
            }
        }
    }
})

export const userActions = userSlice.actions