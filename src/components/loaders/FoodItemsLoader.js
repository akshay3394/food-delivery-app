import Button from "../Button"

function FoodItemLoader() {
    return (
        <div className={"col-sm-12 col-md-6 col-lg-4 py-2"} >
            <div className={`card h-100 bg-light`}>
                <div className="placeholder-glow ">
                    <img style={{ height: 250 }} className="card-img-top placeholder" />
                </div>
                <div className="card-body">
                    <div className="card-title placeholder-glow">
                        <span className="h5 placeholder col-6"></span>
                    </div>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-2"></span>
                    </p>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-8"></span>
                    </p>
                    <Button className="btn btn-warning text-light placeholder col-4" disabled></Button>
                </div>
            </div>
        </div>
    )
}


export default function FoodItemsLoader() {

    return (
        <>
            {
                [...Array(10)].map((n, i) => <FoodItemLoader key={i} />)
            }
        </>
    )
}