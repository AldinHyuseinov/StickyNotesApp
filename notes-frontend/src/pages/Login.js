import FormFields from "../components/FormFields";
import { useState } from "react";
import { showIfBlankFields, showBadCredentialsError } from "../utils/FormUtils";
import { setUserData } from "../utils/UserUtil";

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [blankFields, setBlankFields] = useState(false)
    const [badCredentials, setBadCredentials] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username === "" || password === "") {
            setBlankFields(true)
            return
        }
        setBlankFields(false)

        const data = {
            username: username,
            password: password
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        setBadCredentials(false)

        fetch("http://localhost:8000/api/auth/login", requestOptions)
            .then((response) => {

                if (response.status === 200) {
                    const user = { username: username, authorization: response.headers.get('Authorization') }
                    response.json().then((data) => user.username = data.username)
                    setUserData(user)
                    window.location.href = "/"
                } else {
                    setBadCredentials(true)
                }
            })
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Login</h1>
            {showIfBlankFields(blankFields)}
            {showBadCredentialsError(badCredentials)}
            <form onSubmit={handleSubmit}>
                <FormFields
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword} />
                <div className="row mb-3">
                    <div className="col-4"></div>
                    <button type="submit" className="col-4 btn btn-warning">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;