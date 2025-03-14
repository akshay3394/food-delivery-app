import OrderItem from "./OrderItem";


export default function OrderDetails({ order }) {


    return (
        <div className="container">

            {/* <div className="card border m-2">
                <div className="card-header">
                    Order # - {order.id}
                </div>
                <div className="card-body">
                    <div className="card-text">
                        {
                            order.items.map(item => <OrderItem item={item} />)
                        }
                    </div>
                </div>
                <div className="card-footer text-end">
                    Total price: Rs. {order.totalPrice}
                </div>
            </div> */}

            <div className="accordion mb-2" id="orders">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${order.id}`} aria-controls="collapseOne">
                            Order # - {order.id}
                        </button>
                    </h2>
                    <div id={order.id} className="accordion-collapse collapse" data-bs-parent="#orders">
                        <div className="accordion-body p-0">
                            <div className="card">
                                <div className="card-header">
                                   Status - {order.status}
                                </div>
                                <div className="card-body">
                                    <div className="card-text">
                                        {
                                            order.items.map(item => <OrderItem key={item.id} item={item} />)
                                        }
                                    </div>
                                </div>
                                <div className="card-footer text-end">
                                    Total price: Rs. {order.totalPrice}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}