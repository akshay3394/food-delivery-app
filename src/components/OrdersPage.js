import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import OrderDetails from "./OrderDetails";
import { Await, Link, useLoaderData } from "react-router-dom";
import Loader from "./Loader";
import ErrorElement from "./ErrorElement";


export default function OrdersPage({ closeOrders }) {

    const modalRef = useRef()

    useEffect(function () {
        modalRef.current.openModel()
    }, [])


    // const [orders, setOrders] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState()

    // async function fetchOrders() {
    //     const response = await fetch("http://localhost:3001/orders")

    //     if (!response.ok) {
    //         const errorMessage = await response.text()
    //         throw new Error(errorMessage || "Error Fetching Orders")
    //     } else {
    //         return await response.json()
    //     }
    // }

    // useEffect(() => {
    //     setIsLoading(true)

    //     console.log("Loading orders");

    //     fetchOrders()
    //         .then((fetchedOrders) => {
    //             setOrders(fetchedOrders)
    //             setIsLoading(false)

    //         })
    //         .catch((err) => {
    //             setError(err.message || "Error Fetching Orders")
    //             setIsLoading(false)

    //         })
    // }, [])


    const {orders} = useLoaderData()


    return (
        <Modal ref={modalRef}>

            <Suspense fallback={<Loader />}>
                <Await resolve={orders} errorElement={<ErrorElement/>}>
                    {
                        (fetchedOrders) => fetchedOrders.map(order => <OrderDetails key={order.id} order={order} />)
                    }
                </Await>
            </Suspense>
            <Link className="btn btn-dark" to="/" onClick={closeOrders}>Close</Link>
        </Modal>
    )
}

async function fetchOrders(){
    const response = await fetch("http://localhost:3001/orderss")

    if (!response.ok) {
        let errorMessage = await response.text()
        errorMessage = errorMessage ?? "Error Fetching Orders"
        throw new Response(JSON.stringify({ message: errorMessage }), { status: 500 })
    } else {
        return await response.json()
    }
}

export function ordersLoader() {
    console.log("Loading orders");

    return {
        orders : fetchOrders()
    }
}

