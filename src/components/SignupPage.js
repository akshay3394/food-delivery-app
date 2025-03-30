import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";


export default function SignupPage() {

    const [validationErrros, setValidationErrors] = useState([])

    const navigate = useNavigate()

    function signupSuccessHandler(message) {
        navigate("/login")
    }

    async function signup(userDetails) {
        const response = await fetch("http://localhost:3001/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails),
        })

        if (!response.ok) {
            const errorMessage = await response.text()
            console.log("Error signup: " + errorMessage);

            throw new Error(errorMessage)
        }

        const successMessage = await response.text()
        console.log(successMessage);

        return successMessage
    }

    const { mutate, data, isPending, isError: isSignUpError, error: signUpError } = useMutation({
        mutationFn: signup
    })

    function validateUserDetails(userDetails) {

        const errors = []

        if (userDetails.email.length < 1) {
            errors.push("Email cannot be empty")
        }

        if (userDetails.name.length < 1) {
            errors.push("Name cannot be empty")
        }

        if (userDetails.password.length < 1) {
            errors.push("Password cannot be empty")
        }

        if (userDetails.confirm_password != userDetails.password) {
            errors.push("Confirm password does not match")
        }

        return errors
    }

    function handleSignup(event) {
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
            onSuccess: signupSuccessHandler,
        })
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-xs-8 col-sm-8 col-md-6 col-lg-4 p-4 shadow-lg rounded ">
                    <form onSubmit={handleSignup}>
                        <div className="text-center mb-4">
                            <h3 className="text-success">Welcome to King Cafe.</h3>
                            <h4 className="">Create new account</h4>
                        </div>

                        {
                            validationErrros.length > 0 && <div className="alert alert-danger" role="alert">
                                {validationErrros.map(err => <li key={err}>{err}</li>)}
                            </div>
                        }

                        {
                            isSignUpError && <div className="alert alert-danger" role="alert">
                                <FontAwesomeIcon icon={faCircleExclamation} size="lg" className="me-2" />
                                {signUpError.message}
                            </div>
                        }

                        <Input name="name" label="Name" />
                        <Input type="email" name="email" label="Email" />
                        <Input type="password" name="password" label="Password" />
                        <Input name="confirm_password" label="Confirm Password" />

                        {
                            isPending ? <Button className="btn btn-primary" disabled={isPending} >
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status"> Submitting</span>
                            </Button> :
                            <Button className="btn btn-primary">Create</Button>
                        }

                        <Link to="/" className="btn btn-link">Cancle</Link>
                    </form>

                    <div className="text-center mt-4">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}