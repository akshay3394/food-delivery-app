import { Suspense, use, useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import FoodItem from "./FoodIteam";
import CartContext from "../store/CartContext";
import { Await, useLoaderData } from "react-router-dom";
import ErrorElement from "./ErrorElement";

export default function FoodItems({ }) {

    const { items, addItem, removeItem } = useContext(CartContext)

    const { foodItems } = useLoaderData()

    function addItemToCart(itemToAdd) {
        addItem(itemToAdd)
    }


    return (
        <div className="container mt-4">
            <div className="row">
                <Suspense fallback={<Loader />}>
                    <Await resolve={foodItems}>
                        {
                            (fetchedFoodItems) => {
                                return fetchedFoodItems
                                        .map(foodItem => <FoodItem key={foodItem.name} foodItem={foodItem} onClick={() => addItemToCart(foodItem)} />)
                                
                            }
                        }
                    </Await>
                </Suspense>
            </div >
        </div >
    )
}


async function fetchFoodItems() {
    const response = await fetch("http://localhost:3001/food-items")

    if (!response.ok) {
        const message = await response.text()
        console.log("Error fetching data: ", message);
        throw new Response(JSON.stringify({ message: "Error fetching data: " + message }), { status: 500 })
    } else {
        return await response.json()
    }
}

export const foodItemsLoader = () => {
    return {
        foodItems: fetchFoodItems()
    }
}