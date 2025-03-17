import { useRouteError } from "react-router-dom"

export default function ErrorElement({message="Something went wrong"}) {

    // const error = useRouteError()

    return (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    )
}