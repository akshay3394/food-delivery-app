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
            console.log("Error fetching data: ", response.text);
        } else {
            const data = await response.json()
            setFoodItems(data)
        }
        setLoading(false)
    }

    useState(() => {
        const foodItemsData = fetchFoodItems()
        setFoodItems(foodItems)
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