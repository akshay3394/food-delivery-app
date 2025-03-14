import NavbarBrand from "./NavbarBrand"
import NavbarToggler from "./NavbarToggler"
import Nav from "./Nav"
import Button from "./Button"
import { useContext, useState } from "react"
import CartContext from "../store/CartContext"
import Cart from "./Cart"
import CheckOutPage from "./CheckOutPage"
import OrdersPage from "./OrdersPage"

function Header({ }) {

    const { items } = useContext(CartContext)
    const [isOpenCart, setIsOpenCart] = useState(false)

    const [isShowCheckout, setIsShowCheckout] = useState(false)

    const [isShowOrders, setIsShowOrders] = useState(false)

    function openCart() {
        setIsOpenCart(true)
    }

    function closeCart() {
        // console.log("Closing cart");
        setIsOpenCart(false)
    }


    function openCheckout() {
        setIsShowCheckout(true)
    }

    function closeCheckout() {
        setIsShowCheckout(false)
    }


    function openOrders() {
        setIsShowOrders(true)
    }

    function closeOrders() {
        setIsShowOrders(false)
    }


    let numberOfItems = items.reduce((prev, item) => prev + item.quantity, 0)

    return (
        <>
            <Nav>
                <NavbarBrand>Tomato</NavbarBrand>

                <div className="float-end">
                    <Button id="cart" style={"light"} onClick={openCart}>Cart ({numberOfItems})</Button>
                    <Button style={"light"} onClick={openOrders} >Orders</Button>
                </div>
            </Nav>
            
            <Cart show={isOpenCart} closeCart={closeCart} openCheckout={openCheckout} />

            <CheckOutPage show={isShowCheckout} closeCheckOutPage={closeCheckout} openCart={openCart} />
        
            <OrdersPage show={isShowOrders} closeOrders={closeOrders} />
        </>
    )
}

export default Header;