import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import OrderDetails from "./OrderDetails";


export default function OrdersPage({ show, closeOrders }) {

    const modalRef = useRef()

    useEffect(function () {
        if (show) {
            modalRef.current.openModel()
        }

        if (!show) {
            // console.log("calling: modalRef.current.closeModel() ");       
            modalRef.current.closeModel()
        }
    }, [show])


    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    async function fetchOrders() {
        const response = await fetch("http://localhost:3001/orders")

        if (!response.ok) {
            const errorMessage = await response.text()
            throw new Error(errorMessage || "Error Fetching Orders")
        } else {
            return await response.json()
        }
    }

    useEffect(() => {
        setIsLoading(true)

        console.log("Loading orders");
        
                
        fetchOrders()
            .then((fetchedOrders) => {
                setOrders(fetchedOrders)
            })
            .catch((err) => {
                setError(err.message || "Error Fetching Orders")
            })
    }, [show])


    return (
        <Modal ref={modalRef}>

            {
                orders.map(order => <OrderDetails key={order.id} order={order}/>)
            }

            <Button style="dark" onClick={closeOrders}>Close</Button>
        </Modal>
    )
}