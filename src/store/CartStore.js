import { configureStore, createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            const selectedItemIndex = state.items.findIndex(item => item.id === newItem.id)

            if (selectedItemIndex < 0) {
                state.items.push({
                    ...newItem,
                    quantity: 1
                })
            } else {
                state.items[selectedItemIndex].quantity++
            }
        },
        removeItem: (state, action) => {
            const id = action.payload
            const selectedItemIndex = state.items.findIndex(item => item.id === id)

            if (state.items[selectedItemIndex].quantity > 1) {
                state.items[selectedItemIndex].quantity--
            } else {
                state.items.splice(selectedItemIndex, 1)
            }
        },
        clearCart: (state) => {
            state.items = []
        }
    }
})


export const cartActions = cartSlice.actions
