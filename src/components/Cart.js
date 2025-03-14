import { useContext, useEffect, useRef } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Button from "./Button";
import CartItem from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";


export default function Cart({ show, closeCart, openCheckout }) {

    const modalRef = useRef()

    const { items } = useContext(CartContext)

    useEffect(function () {
        if (show) {
            modalRef.current.openModel()
        }

        if (!show) {
            // console.log("calling: modalRef.current.closeModel() ");       
            modalRef.current.closeModel()
        }
    }, [show])

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

            <div className="mx-2 my-3 text-success">
                Total: {totalPrice} <FontAwesomeIcon icon={faIndianRupeeSign} />
            </div>


            <Button style={"light"} onClick={closeCart}>close</Button>

            <Button style={"dark"} onClick={openCheckoutPage} disabled={!items.length > 0} >
                Proceed to checkout <FontAwesomeIcon icon={faArrowRight}/>
            </Button>

        </Modal>

    )
}