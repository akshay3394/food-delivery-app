
export default function NavbarBrand({ children }) {

    return (
        <div className="col-md-4 col-sm-12">
            <a href="#" className="navbar-brand ms-4  text-danger">{children}</a>
        </div>
    )
}