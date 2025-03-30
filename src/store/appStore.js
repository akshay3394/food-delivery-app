import { configureStore } from "@reduxjs/toolkit"
import { cartSlice } from "./CartStore"
import { userSlice } from "./UserStore"


const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        user: userSlice.reducer
    }
})

export default store