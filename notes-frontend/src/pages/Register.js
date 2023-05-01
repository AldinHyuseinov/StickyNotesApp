import FormFields from "../components/FormFields";
import { useState } from "react";
import { showIfBlankFields, showIfUserUnique, showConfirmPasswordError, showPasswordMatch } from "../utils/FormUtils";

function RegisterPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [uniqueUser, setUniqueUser] = useState(true)
    const [blankFields, setBlankFields] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username === "" || password === "" || confirmPassword === "") {
            setBlankFields(true)
            return
        }
        setBlankFields(false)

        const data = {
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch("http://localhost:8000/api/auth/register", requestOptions)
            .then((response) => {

                if (response.status === 201) {
                    window.location.href = "/auth/login"
                } else {
                    response.json().then(errors => {
                        setUniqueUser(true)

                        for (const key in errors) {

                            if (errors[key] === 'Username is already occupied.') {
                                setUniqueUser(false)
                                break;
                            }
                        }
                    })
                }
            })
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Register</h1>
            {showIfUserUnique(uniqueUser)}
            {showIfBlankFields(blankFields)}
            <form onSubmit={handleSubmit}>
                <FormFields
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                />
                <div className="row mb-3">
                    <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(event) => {
                                const value = event.target.value
                                setConfirmPassword(value)

                                if (value === password) {
                                    setPasswordsMatch(true)
                                } else {
                                    setPasswordsMatch(false)
                                }

                                if (value.length >= 5) {
                                    setConfirmPasswordError(false)
                                } else {
                                    setConfirmPasswordError(true)
                                }
                            }
                            }
                        />
                        {showConfirmPasswordError(confirmPasswordError)}
                        {showPasswordMatch(passwordsMatch)}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4"></div>
                    <button type="submit" className="col-4 btn btn-warning">Register</button>
                </div>
            </form>
        </div>
    );
}


export default RegisterPage;