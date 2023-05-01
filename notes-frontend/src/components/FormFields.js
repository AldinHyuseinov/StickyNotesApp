import { useState } from "react";
import { showUsernameError, showPasswordError } from "../utils/FormUtils";

function FormFields(props) {
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    return (
        <>
            <div className="row mb-3">
                <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="username" value={props.username} onChange={(event) => {
                        const value = event.target.value
                        props.setUsername(value)

                        if (value.length >= 2 && value.length <= 20) {
                            setUsernameError(false)
                        } else {
                            setUsernameError(true)
                        }
                    }
                    } />
                    {showUsernameError(usernameError)}
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" value={props.password} onChange={(event) => {
                        const value = event.target.value
                        props.setPassword(value)

                        if (value.length >= 5) {
                            setPasswordError(false)
                        } else {
                            setPasswordError(true)
                        }
                    }
                    } />
                    {showPasswordError(passwordError)}
                </div>
            </div>
        </>
    );
}

export default FormFields;