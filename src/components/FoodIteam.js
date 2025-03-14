import Button from "./Button";


export default function FoodItem({ foodItem, onClick }) {


    return (
        <div className="col-4 py-2">
            <div className="card h-100 bg-light">
                <img src={`http://localhost:3001/${foodItem.image}`} style={{height : 250}} className="card-img-top" alt={foodItem.name} />
                <div className="card-body">
                    <h5 className="card-title">{foodItem.name}</h5>
                    <p className="card-text">{foodItem.details}</p>
                    <Button style={"outline-dark"} onClick={onClick}>Add to cart</Button>
                </div>
            </div>
        </div>
    )
}