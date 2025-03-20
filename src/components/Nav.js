

export default function Nav({children}) {

    return (
        <nav className="navbar bg-body-tertiary shadow row" >
            {/* <div className="container-fluid row"> */}
                {children}
            {/* </div> */}
        </nav>
    )
}