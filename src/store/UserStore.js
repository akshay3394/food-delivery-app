import { createSlice } from "@reduxjs/toolkit";

const initialUserDetails = {
    sessionId: "",
    userId: "",
    name: ""
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
            return initialUserDetails
        }
    }
})

export const userActions = userSlice.actions