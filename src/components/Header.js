import NavbarBrand from "./NavbarBrand"
import Nav from "./Nav"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faTree } from "@fortawesome/free-solid-svg-icons"
import { faLemon } from "@fortawesome/free-regular-svg-icons"
import { Link, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

function Header({ }) {

    const items = useSelector(state=>state.cart.items)

    let numberOfItems = items.reduce((prev, item) => prev + item.quantity, 0)

    return (
        <>
            <Nav>
                <NavbarBrand>
                    <FontAwesomeIcon icon={faLemon} size="lg" /> Lemon tree <FontAwesomeIcon icon={faTree} size="lg" />
                </NavbarBrand>

                <div className="float-end">

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