
export default function OrderItem({ item }) {


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
                </div>
                <div className="col-10 ps-2 py-2">
                    <div className="px-2">
                        {item.name}
                    </div>
                    <div className="px-2 pt-2">
                        Rs. {item.price} x {item.quantity}
                    </div>
                </div>
            </div>
        </div>
    )
}