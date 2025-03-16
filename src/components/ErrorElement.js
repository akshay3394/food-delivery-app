import { useRouteError } from "react-router-dom"

export default function ErrorElement() {

    const error = useRouteError()

    return (
        <div className="alert alert-danger" role="alert">
            {"Error page"}
        </div>
    )
}