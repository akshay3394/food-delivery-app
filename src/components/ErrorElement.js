import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouteError } from "react-router-dom"

export default function ErrorElement({message="Something went wrong"}) {

    // const error = useRouteError()

    return (
        <div className="alert alert-danger" role="alert">
            <FontAwesomeIcon icon={faCircleExclamation} size="lg"/> {message}
        </div>
    )
}