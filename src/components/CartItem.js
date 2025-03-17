import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus, faIndianRupeeSign, faStar, faCircle } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStartReg } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/CartStore";

export default function CartItem({ item }) {

    const imageStyle = {
        backgroundImage: `url('http://localhost:3001/${item.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    }

    const vegIcon = item.veg ? "text-success border border-1 border-success p-1" : "text-danger border border-1 border-danger p-1"


    const dispatch = useDispatch()

    function addItemToCart() {
        dispatch(cartActions.addItem(item))
    }

    function removeItemFromCart(){
        dispatch(cartActions.removeItem(item.id))
    }

    return (
        <div className="container">
            <div className="row border my-2">
                <div className="col-2 p-2" >
                    <div className="w-100 h-100" style={imageStyle}>

                    </div>
                    {/* <img class="rounded w-100" src={`http://localhost:3001/${item.image}`} alt={item.name} /> */}
                </div>
                <div className="col-6 ps-2 py-2">
                    <div className="px-2">
                        {item.name} <FontAwesomeIcon className={vegIcon} icon={faCircle} size="xs" />
                        <span className="text-warning ms-2">
                            {
                                [...Array(item.rating)].map((n, key) => <FontAwesomeIcon key={key} icon={faStar} size="xs" />)
                            }
                            {
                                [...Array(5 - item.rating)].map((n, key) => <FontAwesomeIcon key={key} icon={faStartReg} size="xs" />)
                            }
                        </span>
                    </div>
                    <div className="px-2 pt-2">
                        <FontAwesomeIcon icon={faIndianRupeeSign} /> <em>{item.price} x {item.quantity}</em>
                    </div>
                </div>
                <div className="col-4 pt-3">
                    <div className="float-end">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button className="btn btn-success" onClick={removeItemFromCart}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span className="text-bg-success px-1 py-2">
                                {item.quantity}
                            </span>
                            <button className="btn btn-success" onClick={addItemToCart}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}