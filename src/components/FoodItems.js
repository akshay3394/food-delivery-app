import { Suspense } from "react";
import Loader from "./Loader";
import FoodItem from "./FoodIteam";
import { Await, useLoaderData, useLocation, useSearchParams } from "react-router-dom";
import { QueryClient, useQuery, useSuspenseQuery } from "@tanstack/react-query"
import ErrorElement from "./ErrorElement";
import { queryClient } from "../App";
import FoodItemsLoader from "./loaders/FoodItemsLoader";

export default function FoodItems({ }) {

    // const { foodItems } = useLoaderData()


    // async function fetchFoodItems() {
    //     // console.log("Fetching food items");

    //     const response = await fetch("http://localhost:3001/food-items")

    //     if (!response.ok) {
    //         const message = await response.text()
    //         console.log("Error fetching data: ", message);
    //         throw new Response(JSON.stringify({ message: "Error fetching data: " + message }), { status: 500 })
    //     } else {
    //         return await response.json()
    //     }
    // }

    
    const [searchParam] = useSearchParams()

    const searchKeyWord = searchParam.get("search")
    const queryKey = ["foodItems"]
    
    if (searchKeyWord) {
        queryKey.push(searchKeyWord)
    }

    const { data: foodItems, isFetching, error, isError, isSuccess } = useQuery({
        queryKey: queryKey,
        queryFn: () => fetchFoodItems(searchKeyWord),
        staleTime: 30 * 1000,    
    })

    let content

    if (isError) {
        console.log(error);
        content = <ErrorElement message={error.message} />
    }

    if (isFetching) {
        content = <FoodItemsLoader />
    }

    if (isSuccess && foodItems) {
        content = foodItems.map(foodItem => <FoodItem key={foodItem.name} foodItem={foodItem} />)
    }

    if (foodItems != undefined && foodItems.length == 0) {
        content = <div className="alert alert-warning" role="alert">No results found. Try other search phrase</div>
    }

    const {pathname} = useLocation()
    // Not good code but this is to avoid showing food items on login & signup page
    if (pathname == "/login" || pathname == "/signup") {
        content = <></>
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {/* <Suspense fallback={<Loader />}>
                    <Await resolve={foodItems}>
                        {
                            (fetchedFoodItems) => {
                                return fetchedFoodItems
                                    .map(foodItem => <FoodItem key={foodItem.name} foodItem={foodItem} />)

                            }
                        }
                    </Await>
                </Suspense> */}

                {
                    content
                }
            </div >
        </div >
    )
}


async function fetchFoodItems(searchKeyWord) {
    
    let url = "http://localhost:3001/food-items"

    if (searchKeyWord) {
        console.log("Fetching food items: ", searchKeyWord);
        url += "?search="+searchKeyWord
    } else {
        console.log("Fetching all food items");
    }
    
    const response = await fetch(url)

    if (!response.ok) {
        const message = await response.text()
        console.log("Error fetching data: ", message);
        throw new Response(JSON.stringify({ message: "Error fetching data: " + message }), { status: 500 })
    } else {
        return await response.json()
    }
}

// export const foodItemsLoader = async () => {
//     return {
//         foodItems: fetchFoodItems()
//     }
// }


export const foodItemsLoader = async () => {
    return queryClient.fetchQuery({
        queryKey: ["foodItems"],
        queryFn: fetchFoodItems
    })
}