import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { faCircle, faIndianRupeeSign, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStartReg } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";


export default function FoodItem({ foodItem, onClick }) {

    const vegIcon = foodItem.veg ? "text-success border border-1 border-success p-1" : "text-danger border border-1 border-danger p-1"

    const [cardStyle, setCardStyle] = useState("")

    function highlightItem() {
        setCardStyle("border-secondary-subtle shadow")
    }

    function unHighlightItem() {
        setCardStyle("")
    }

    return (
        <div className={"col-sm-12 col-md-6 col-lg-4 py-2"} onMouseOver={highlightItem} onMouseLeave={unHighlightItem}>
            <div className={`card h-100 bg-light ${cardStyle}`}>
                <img src={`http://localhost:3001/${foodItem.image}`} style={{ height: 250 }} className="card-img-top" alt={foodItem.name} />
                <div className="card-body">
                    <div className="card-title">
                        <span className="h5">{foodItem.name}</span> <FontAwesomeIcon className={vegIcon} icon={faCircle} size="xs" />
                        <span className="text-warning ms-2">
                            {
                                [...Array(foodItem.rating)].map((n, key) => <FontAwesomeIcon key={key} icon={faStar} size="xs" />)
                            }
                            {
                                [...Array(5 - foodItem.rating)].map((n, key) => <FontAwesomeIcon key={key} icon={faStartReg} size="xs" />)
                            }
                        </span>
                    </div>
                    <p className="card-text"><FontAwesomeIcon icon={faIndianRupeeSign} /> {foodItem.price}</p>
                    <p className="card-text text-truncate">
                        <span data-bs-toggle="tooltip" data-bs-title="Default tooltip">
                           {foodItem.details}
                        </span>
                    </p>
                    <Button style={"outline-dark"} onClick={onClick}>Add to cart</Button>
                </div>
            </div>
        </div>
    )
}