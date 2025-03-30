import { Link } from "react-router-dom";

export default function NavbarBrand({ children }) {

    return (
        <div className="col-md-4 col-sm-12">
            <Link to="/" className="navbar-brand ms-4  text-danger">{children}</Link>
        </div>
    )
}