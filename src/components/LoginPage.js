import { useRef, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { userActions } from "../store/UserStore";


export const USER_DETAILS = "USER_DETAILS"

export default function LoginPage() {

    const [validationErrros, setValidationErrors] = useState([])

    const { mutate, isError: isLoginError, error: loginError, isPending } = useMutation({
        mutationFn: login
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    async function login({ email, password }) {
        // console.log("Logging in");

        const loginDetails = {
            email: email,
            password: password
        }

        // console.log(loginDetails);

        const response = await fetch("http://localhost:3001/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginDetails),
        })


        if (!response.ok) {
            const errorMessage = await response.text()
            console.log(errorMessage);
            throw new Error(errorMessage)
        }


        const userDetails = await response.json()

        return userDetails
    }


    function validateUserDetails(userDetails) {

        const errors = []

        if (userDetails.email.length < 1) {
            errors.push("Email cannot be empty")
        }

        if (userDetails.password.length < 1) {
            errors.push("Password number cannot be empty")
        }

        return errors
    }


    const [searchParam, setSearchParam]  = useSearchParams()


    function handlerLoginSuccess(userData) {
        console.log(userData);

        dispatch(userActions.setUserDetails({
            sessionId: userData.sessionId,
            userId: userData.id,
            name: userData.name
        }))

        localStorage.setItem(USER_DETAILS
            , JSON.stringify({
            sessionId: userData.sessionId,
            userId: userData.id,
            name: userData.name
        }))

        let navigatetTo = "/"
        if (searchParam.has("navigateTo")) {
            navigatetTo = navigatetTo + searchParam.get("navigateTo")
        }

        navigate(navigatetTo)
    }

    function handleLogin(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const userDetails = Object.fromEntries(formData)

        const validationErrros = validateUserDetails(userDetails)

        if (validationErrros.length > 0) {
            setValidationErrors(validationErrros)
            return
        }

        setValidationErrors([])

        mutate(userDetails, {
            onSuccess: handlerLoginSuccess
        })
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-xs-8 col-sm-8 col-md-6 col-lg-4 p-4 shadow-lg rounded ">

                    <form onSubmit={handleLogin}>
                        <div className="text-center mb-4">
                            <h3 className="text-success">Welcome to King Cafe.</h3>
                            <h4 className="">Login into you account</h4>
                        </div>

                        {
                            validationErrros.length > 0 && <div className="alert alert-danger" role="alert">
                                {/* <FontAwesomeIcon icon={faCircleExclamation} size="lg" />  */}
                                {validationErrros.map(err => <li key={err}>{err}</li>)}
                            </div>
                        }

                        {
                            isLoginError && <div className="alert alert-danger" role="alert">
                                <FontAwesomeIcon icon={faCircleExclamation} size="lg" className="me-2" />
                                {loginError.message}
                            </div>
                        }

                        <Input type="email" name="email" label="Email" />
                        <Input type="password" name="password" label="Password" />

                        {
                            isPending ?
                                <Button className="btn btn-primary" disabled={isPending} >
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status"> Login</span>
                                </Button> :
                                <Button className="btn btn-primary">Login</Button>
                        }

                        <Link to="/" className="btn btn-link">Cancle</Link>
                    </form>

                    <div className="text-center mt-4">
                        Don't have an account? <Link to="/signup">Create account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
