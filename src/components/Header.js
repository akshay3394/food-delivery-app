import NavbarBrand from "./NavbarBrand"
import NavbarToggler from "./NavbarToggler"
import Nav from "./Nav"
import Button from "./Button"
import { useContext, useState } from "react"
import CartContext from "../store/CartContext"
import Cart from "./Cart"
import OrdersPage from "./OrdersPage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faTree } from "@fortawesome/free-solid-svg-icons"
import { faLemon } from "@fortawesome/free-regular-svg-icons"
import { Link, Outlet } from "react-router-dom"

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
                <NavbarBrand>
                    <FontAwesomeIcon icon={faLemon} size="lg" /> Lemon tree <FontAwesomeIcon icon={faTree} size="lg" />
                </NavbarBrand>

                <div className="float-end">
                    {/* <Button id="cart" style={"light"} onClick={openCart}>
                        <FontAwesomeIcon icon={faCartShopping} size="lg" /> ({numberOfItems})
                    </Button> */}
                    {/* <Button style={"light"} onClick={openOrders} >Orders</Button> */}

                    <Link to="cart" className="btn btn-light">
                        <FontAwesomeIcon icon={faCartShopping} size="lg" /> ({numberOfItems})
                    </Link>

                    <Link to="orders" className="btn btn-light">Orders</Link>


                </div>
            </Nav>
            
            <Outlet></Outlet>
        </>
    )
}

export default Header;