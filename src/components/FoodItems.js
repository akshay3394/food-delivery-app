import { Suspense } from "react";
import Loader from "./Loader";
import FoodItem from "./FoodIteam";
import { Await, useLoaderData } from "react-router-dom";

export default function FoodItems({ }) {

    const { foodItems } = useLoaderData()

    return (
        <div className="container mt-4">
            <div className="row">
                <Suspense fallback={<Loader />}>
                    <Await resolve={foodItems}>
                        {
                            (fetchedFoodItems) => {
                                return fetchedFoodItems
                                    .map(foodItem => <FoodItem key={foodItem.name} foodItem={foodItem} />)

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