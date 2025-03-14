

export default function Nav({children}) {

    return (
        <nav className="navbar bg-body-tertiary navbar-expand-lg" >
            <div className="container-fluid">
                {children}
            </div>
        </nav>
    )
}