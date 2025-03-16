import { useContext, useEffect, useRef } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Button from "./Button";
import CartItem from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


export default function Cart({ closeCart, openCheckout }) {

    const modalRef = useRef()

    const { items } = useContext(CartContext)

    useEffect(function () {
        modalRef.current.openModel()
    }, [])

    const totalPrice = items.reduce((prev, item) => (prev + item.price * item.quantity), 0)

    let numberOfItems = items.reduce((prev, item) => prev + item.quantity, 0)


    function openCheckoutPage() {
        closeCart()
        openCheckout()
    }



    return (

        <Modal ref={modalRef} onClose={closeCart}>
            <h3 className="text-center mb-4">Your Cart - {numberOfItems} items </h3>

            <div>
                {
                    items.length > 0 ? items.map(item => <CartItem key={item.id} item={item} />) : <h4>Empty Cart</h4>
                }
            </div>

            <div className="mx-2 my-3 text-success h5">
                <strong>Total: <em>{totalPrice}</em></strong> <FontAwesomeIcon icon={faIndianRupeeSign} />
            </div>


            <Link className="btn btn-light" to="/" onClick={closeCart}>close</Link>

            {
                items.length > 0 && <Link className="btn btn-dark" to="/checkout" >
                        Proceed to checkout <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
            }


        </Modal>

    )
}