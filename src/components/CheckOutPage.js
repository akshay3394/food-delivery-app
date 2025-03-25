import Input from "./Input";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { faArrowLeft, faArrowRight, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/CartStore";
import { useMutation } from "@tanstack/react-query";


export default function CheckOutPage() {

    const modalRef = useRef()

    const items = useSelector(state => state.cart.items)

    const totalPrice = items.reduce((prev, item) => (prev + item.price * item.quantity), 0)

    const [validationErrros, setValidationErrors] = useState([])

    useEffect(function () {
        modalRef.current.openModel()
    }, [])

    // const nameRef = useRef()
    // const phoneRef = useRef()
    // const addressRef = useRef()
    // const paymentMode = useRef()

    const dispatch = useDispatch()
    function clearAllCart() {
        dispatch(cartActions.clearCart())
    }

    const navigate = useNavigate()
    function closeCheckout() {
        navigate("/")
    }

    async function placeOrderRequest(orderDetails) {

        console.log("Submitting order");

        const response = await fetch("http://localhost:3001/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails),
        })

        if (!response.ok) {
            console.log("Error placing order");

            const error = new Error("Error placing order")
            error.status = 500
            error.message = await response.text()
            
            throw error
        }

        console.log("Order placed successfully");
        clearAllCart()
        return await response.json()
    }


    const { mutate, isSuccess, isPending, isError, error, data } = useMutation({
        mutationFn: placeOrderRequest
    })


    function validateOrderDetails(orderDetails) {

        const errors = []

        if (orderDetails.name.length < 1) {
            errors.push("Name cannot be empty")
        }

        if (orderDetails.phone.length < 1) {
            errors.push("Phone number cannot be empty")
        } else if (orderDetails.phone.length != 10) {
            errors.push("Invalid phone number")
        }

        if (orderDetails.address.length < 1) {
            errors.push("Address cannot be empty")
        }

        return errors
    }


    function handlePlaceOrder(event) {
        event.preventDefault()

        const formData = new FormData(event.target)

        let orderDetails = Object.fromEntries(formData)

        const validationErrros = validateOrderDetails(orderDetails)

        if (validationErrros.length > 0) {
            setValidationErrors(validationErrros)
            return
        }

        orderDetails["items"] = items
        orderDetails["totalPrice"] = totalPrice
        orderDetails["payment-mode"] = "Cash On Delivery"

        // placeOrderRequest(orderDetails)

        mutate(orderDetails)
    }



    const deliveryDetailsContent = <>
        <h3 className="text-center mb-4">Provide delivery details</h3>

        <h4 className="text-center">
            Total: {totalPrice} <FontAwesomeIcon icon={faIndianRupeeSign} />
        </h4>

        {
            validationErrros.length > 0 && <div className="alert alert-danger" role="alert">
                {/* <FontAwesomeIcon icon={faCircleExclamation} size="lg" />  */}
                {validationErrros.map(err => <li key={err}>{err}</li>)}
            </div>
        }

        <form onSubmit={handlePlaceOrder}>
            <Input label="Full Name" name="name"  className="form-control-sm"  />
            <Input label="Phone" type="number" name="phone" className="form-control-sm" />
            <Input label="Address" name="address" textarea className="form-control-sm" />
            <Input label="Payment mode" name="payment-mode" defaultValue="Cash on delivery" disabled className="form-control-sm" />


            <Button className="btn btn-success text-light float-end ms-2 " disabled={isPending}>
                {
                    isPending ? "Submitting.." : "Place Order"
                }
            </Button>

            <Link className="btn btn-warning float-end ms-2" to="/cart" >
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Cart
            </Link>

            <Link className="btn btn-light float-end" to="/">Cancle</Link>
        </form>
    </>


    const closeCheckoutButton = <div className="text-center my-2" >
        <Link to="/" className="btn btn-dark">Close</Link>
    </div>


    return (
        <Modal ref={modalRef} onClose={closeCheckout}>
            {
                // isPending && <h4 className="text-center my-4">Placing order...</h4>
            }

            {
                isSuccess && <>
                    <h4 className="text-center text-success my-4">Order placed successfully</h4>
                    <h5 className="text-center text-secondary my-4">Order # {data.id}</h5>
                    <div className="text-center my-2" >
                        <Link to="/orders" className="btn btn-success">
                            Go to orders <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                    {closeCheckoutButton}
                </>
            }

            {
                isError && <>
                    <h4 className="text-center text-danger my-4">Error placing order</h4>
                    {closeCheckoutButton}
                </>
                
            }

            {
                !isError && !isSuccess && deliveryDetailsContent
            }

        </Modal>
    )
}