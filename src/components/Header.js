import NavbarBrand from "./NavbarBrand"
import Nav from "./Nav"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faChessKing, faCrown, faTree } from "@fortawesome/free-solid-svg-icons"
import { faLemon } from "@fortawesome/free-regular-svg-icons"
import { Link, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import SearchBox from "./SearchBox"
import { USER_DETAILS } from "./LoginPage"
import { useState } from "react"
import Button from "./Button"
import { userActions } from "../store/UserStore"

function Header({ }) {

    const items = useSelector(state => state.cart.items)

    let numberOfItems = items.reduce((prev, item) => prev + item.quantity, 0)

    // const userDetailsSession = localStorage.getItem(USER_DETAILS)
    const userDetails = useSelector(state => state.user)

    const dispatch = useDispatch()

    function logoutHandler() {
        console.log("Logging out");
        dispatch(userActions.removeUserDetails())

        localStorage.removeItem(USER_DETAILS)
    }


    return (
        <>
            <Nav>
                <NavbarBrand>
                    <b style={{ fontSize: 30 }}> <FontAwesomeIcon icon={faCrown} size="lg" className="text-warning" /> King Cafe </b>
                </NavbarBrand>

                <SearchBox />

                <div className="col-md-4 col-sm-12 text-end">

                    <Link to="cart" className="btn btn-light ">
                        <FontAwesomeIcon icon={faCartShopping} size="lg" /> ({numberOfItems})
                    </Link>



                    {
                        userDetails.sessionId ? <>
                            <Link to="orders" className="btn btn-light ">Orders</Link>
                            <Button className="btn btn-light " onClick={logoutHandler}>Logout</Button>
                        </> :
                            <Link to="login" className="btn btn-light ">Login</Link>
                    }

                </div>
            </Nav>

            <Outlet></Outlet>
        </>
    )
}

export default Header;