import { useContext } from "react"
import CartContext from "../store/CartContext"


export default function CartItem({ item }) {

    const { addItem, removeItem } = useContext(CartContext)

    const imageStyle = {
        backgroundImage: `url('http://localhost:3001/${item.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    }

    return (
        <div className="container">
            <div className="row border my-2">
                <div className="col-2 p-2" >
                    <div className="w-100 h-100" style={ imageStyle}>

                    </div>
                    {/* <img class="rounded w-100" src={`http://localhost:3001/${item.image}`} alt={item.name} /> */}
                </div>
                <div className="col-6 ps-2 py-2">
                    <div className="px-2">
                        {item.name}
                    </div>
                    <div className="px-2 pt-2">
                        Rs. {item.price} x {item.quantity}
                    </div>
                </div>
                <div className="col-4 pt-3">
                    <div className="float-end">
                        <button className="btn btn-outline-success" onClick={() => removeItem(item.id)}> - </button>
                        <span className="p-2">
                            {item.quantity}
                        </span>
                        <button className="btn btn-outline-success" onClick={() => addItem(item)}> + </button>
                    </div>
                </div>
            </div>
        </div>
    )
}