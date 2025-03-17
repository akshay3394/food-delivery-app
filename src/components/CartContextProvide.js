import { act, useReducer } from "react"
import CartContext from "../store/CartContext"

export function CartConextProvider({ children }) {

    const [cartContext, cartContextReducer] = useReducer((prevState, action) => {

        if (action.type == "ADD_ITEM") {

            const selectedItemIndex = prevState.items.findIndex(item => item.id === action.item.id)

            if (selectedItemIndex < 0) {
                return {
                    ...prevState,
                    items: [
                        ...prevState.items,
                        {
                            ...action.item,
                            quantity: 1
                        }
                    ]
                }
            } else {

                const newItems = [...prevState.items]
                const existingItem = newItems[selectedItemIndex]

                newItems[selectedItemIndex] = {
                    ...existingItem,
                    quantity: (existingItem.quantity + 1)
                }

                return {
                    ...prevState,
                    items: newItems
                }

            }
        }

        if (action.type == "REMOVE_ITEM") {

            const selectedItemIndex = prevState.items.findIndex(item => item.id === action.id)

            const selectedItem = prevState.items[selectedItemIndex]


            if (selectedItem.quantity > 1) {

                const updatedSelectedItem = {
                    ...selectedItem,
                    quantity: (selectedItem.quantity - 1)
                }

                const newItems = [...prevState.items]
                newItems[selectedItemIndex] = updatedSelectedItem

                return {
                    ...prevState,
                    items: newItems
                }
            } else {
                return {
                    ...prevState,
                    items: [...prevState.items.filter(item => item.id != action.id)]
                }
            }
        }

        if (action.type == "CLEAR_CART") {
            return {
                ...prevState,
                items: []
            }
        }

        return prevState
    }, { items: [] })


    function addItemToCart(item) {
        // console.log("Item to add : ", item);
        cartContextReducer({ type: "ADD_ITEM", item: item })
    }

    function removeItemFromCart(id) {
        cartContextReducer({ type: "REMOVE_ITEM", id: id })
    }

    function clearCart() {
        cartContextReducer({ type: "CLEAR_CART" })
    }

    const cartCtx = {
        items: cartContext.items,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        clearCart: clearCart
    }


    return (
        <CartContext.Provider value={cartCtx}>
            {children}
        </CartContext.Provider>
    )
}
