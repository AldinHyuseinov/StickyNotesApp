import { useState, useEffect } from "react";
import { getUserData, clearUserData } from "../utils/UserUtil";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        if (!getUserData()) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
        }
    }, []);

    const handleSubmit = () => {
        clearUserData()
    }

    return (
        <nav className="navbar navbar-expand-lg bg-warning-subtle">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <form className="d-flex" onSubmit={handleSubmit}>
                                    <input
                                        className="form-control me-2 text-light-emphasis"
                                        type="submit"
                                        value="Logout"
                                    />
                                </form>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/auth/register">
                                        Register
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/auth/login">
                                        Login
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-warning" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;