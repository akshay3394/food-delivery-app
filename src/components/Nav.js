

export default function Nav({children}) {

    return (
        <nav className="navbar bg-body-tertiary shadow container-fluid" >
            {/* <div className="container-fluid row"> */}
                {children}
            {/* </div> */}
        </nav>
    )
}