import { createContext } from "react";


const CartContext = createContext({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {}
})


export default CartContext


