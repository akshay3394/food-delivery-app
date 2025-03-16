import { use, useContext, useState } from "react";
import Loader from "./Loader";
import FoodItem from "./FoodIteam";
import CartContext from "../store/CartContext";

export default function FoodItems({ }) {

    const [foodItems, setFoodItems] = useState([])
    const [isLoading, setLoading] = useState(false)

    const {items, addItem, removeItem} = useContext(CartContext)

    async function fetchFoodItems() {
        setLoading(true)
        const response = await fetch("http://localhost:3001/food-items")

        if (!response.ok) {
            const message = await response.text()
            console.log("Error fetching data: ", message);
            // throw new Response(JSON.stringify({message: "Error fetching data: "+message}), {status:500})
        } else {
            const data = await response.json()
            setFoodItems(data)
        }
        setLoading(false)
    }

    useState(() => {
        fetchFoodItems()
        // setFoodItems(foodItems)
    }, [])


    function addItemToCart(itemToAdd) {
        addItem(itemToAdd)
    }   


    return (
        <div className="container mt-4">


            {isLoading && <Loader></Loader>}

            {
                !isLoading &&
                <div className="row">
                    {
                        foodItems.map(foodItem => <FoodItem key={foodItem.name} foodItem={foodItem} onClick={()=>addItemToCart(foodItem)} />)
                    }
                </div>
            }

        </div>
    )
}