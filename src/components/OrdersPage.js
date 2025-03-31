import { Suspense, useEffect, useRef } from "react";
import Modal from "./Modal";
import OrderDetails from "./OrderDetails";
import { Await, Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ErrorElement from "./ErrorElement";
import { queryClient } from "../App";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { USER_DETAILS } from "./LoginPage";


async function fetchOrders(sessionId) {
    console.log("Fetching orders");

    const response = await fetch("http://localhost:3001/orders", {
        headers: {
            "Session-Id": sessionId
        }
    })

    if (!response.ok) {
        let errorMessage = await response.text()
        errorMessage = errorMessage ?? "Error Fetching Orders"
        throw new Error(JSON.stringify({ message: errorMessage, status: 500 }))
    } else {
        return await response.json()
    }
}


export default function OrdersPage() {

    const modalRef = useRef()

    // const userDetails = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(function () {
        modalRef.current.openModel()
    }, [])


    // const {orders} = useLoaderData()

    const userDetails = JSON.parse(localStorage.getItem(USER_DETAILS))
    const sessionId = userDetails.sessionId


    const { data: orders, isLoading, error, isError, isSuccess } = useQuery({
        queryKey: ["orders", sessionId],
        queryFn: () => fetchOrders(sessionId),
        staleTime: 10 * 1000,
    })


    function closeCheckout() {
        navigate("/")
    }

    let content

    if (isError) {
        content = <ErrorElement message={error.message} />
        // navigate("/login")
        // return redirect("/login")
    }

    if (isLoading) {
        content = <Loader />
    }

    if (orders) {
        content = <>
            <div className="text-center">
                <h3>Your orders</h3>
            </div>
            {
                orders.map(order => <OrderDetails key={order.id} order={order} />)
            }
        </>
    }

    if (isSuccess && orders.length == 0) {
        content = <div className="text-center mt-4">
            <h3>No order history</h3>
        </div>
    }


    return (
        <Modal ref={modalRef} onClose={closeCheckout}>

            {/* <Suspense fallback={<Loader />}>
                <Await resolve={orders} errorElement={<ErrorElement/>}>
                    {
                        (fetchedOrders) => fetchedOrders.map(order => <OrderDetails key={order.id} order={order} />)
                    }
                </Await>
            </Suspense> */}

            {
                content
            }
            <Link className="btn btn-dark" to="/">Close</Link>
        </Modal>
    )
}


export function ordersLoader() {
    console.log("Loading orders");

    let userDetails = localStorage.getItem(USER_DETAILS)

    if (userDetails) {
        userDetails = JSON.parse(userDetails)
    } else {
        return redirect("/login")
    }

    const sessionId = userDetails.sessionId

    return {
        orders: queryClient.fetchQuery({
            queryKey: ["orders", sessionId],
            queryFn: () => fetchOrders(sessionId),
            staleTime: 10 * 1000,
        })
    }

    // return queryClient.fetchQuery({
    //     queryKey: ["orders"],
    //     queryFn: fetchOrders
    // })
}

