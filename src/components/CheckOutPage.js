import Input from "./Input";
import { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../store/CartContext";
import Button from "./Button";
import Modal from "./Modal";
import { faArrowLeft, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


export default function CheckOutPage({ closeCheckOutPage, openCart }) {

    const modalRef = useRef()

    const { items, clearCart } = useContext(CartContext)

    const [submitting, setIsSubmitting] = useState("")

    const totalPrice = items.reduce((prev, item) => (prev + item.price * item.quantity), 0)

    useEffect(function () {
        modalRef.current.openModel()
    }, [])

    const nameRef = useRef()
    const phoneRef = useRef()
    const addressRef = useRef()
    const paymentMode = useRef()


    function clearAllCart() {
        clearCart()
    }

    function closeCheckout() {
        setIsSubmitting("")
        closeCheckOutPage()
    }


    function placeOrderRequest(orderDetails) {

        setIsSubmitting("submitting")

        fetch("http://localhost:3001/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails),
        })
            .then((response) => {
                console.log("Order placed successfully");
                setIsSubmitting("success")
            })
            .catch((error) => {
                console.log("Error placing order ");
                // setError("Error Placing order")
                setIsSubmitting("failed")
            })

    }

    function handlePlaceOrder({event}) {
        event.preventDefault()

        const formData = new FormData(event.target)

        // const name = formData.get("name")
        // const phone = formData.get("phone")
        // const address = formData.get("address")
        // const paymentMode = formData.get("payment-mode")

        // const orderDetails = {
        //     name,
        //     phone,
        //     address,
        //     paymentMode,
        //     items: items.map(item => ({ id: item.id, quantity: item.quantity })),
        //     totalPrice: totalPrice
        // }

        let orderDetails = Object.fromEntries(formData)

        orderDetails["items"] = items
        orderDetails["totalPrice"] = totalPrice


        placeOrderRequest(orderDetails)
        clearAllCart()
    }

    function backToCart() {
        closeCheckOutPage()
        openCart()
    }

    const isSubmitting = submitting == "submitting"
    const isSubmitted = submitting == "success"
    const isError = submitting == "failed"


    const deliveryDetailsContent = <>
        <h3 className="text-center mb-4">Provide delivery details</h3>

        <h4 className="text-center">
            Total: {totalPrice} <FontAwesomeIcon icon={faIndianRupeeSign} />
        </h4>

        <form action={handlePlaceOrder}>
            <Input label="Full Name" name="name" ref={nameRef} required={true} className="form-control-sm" />
            <Input label="Phone" type="number" name="phone" ref={phoneRef} required={true} className="form-control-sm" />
            <Input label="Address" name="address" ref={addressRef} textarea required={true} className="form-control-sm" />
            <Input label="Payment mode" name="payment-mode" ref={paymentMode} value="Cash on delivery" disabled className="form-control-sm" />

            <Button className="float-end ms-2 " style={"dark"} disabled={isSubmitting}>
                {
                    isSubmitting ? "Submitting.." : "Place Order"
                }
            </Button>
          
            <Link className="btn btn-dark float-end ms-2" to="/cart" >
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Cart
            </Link>

            <Link className="btn btn-light float-end" to="/">Cancle</Link>
            {/* <Button type="button" className="float-end" style={"light"} onClick={closeCheckOutPage}>Cancle</Button> */}
        </form>
    </>


    const closeCheckoutButton = <div className="text-center my-2" >
        <Link to="/" className="btn btn-dark">Close</Link>
    </div>


    return (
        <Modal ref={modalRef} onClose={closeCheckOutPage}>
            {
                isSubmitting && <h4 className="text-center my-4">Placing order...</h4>
            }

            {
                isSubmitted && <h4 className="text-center text-success my-4">Order placed successfully</h4>
            }

            {
                isError && <h4 className="text-center text-danger my-4">Error placing order</h4>
            }

            {
                submitting == "" ? deliveryDetailsContent : closeCheckoutButton
            }

        </Modal>
    )
}