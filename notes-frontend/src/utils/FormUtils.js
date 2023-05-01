export const showIfBlankFields = (blankFields) => {

    if (blankFields) {
        return (
            <div className="errors alert alert-danger">Fields should not be empty.</div>
        );
    }
}

export const showIfUserUnique = (uniqueUser) => {

    if (!uniqueUser) {
        return (
            <div className="errors alert alert-danger">Username is already occupied.</div>
        );
    }
}

export const showConfirmPasswordError = (confirmPasswordError) => {

    if (confirmPasswordError) {
        return (
            <div className="errors alert alert-danger">Confirm Password should be at least 5 symbols.</div>
        );
    }
}

export const showPasswordMatch = (passwordsMatch) => {

    if (!passwordsMatch) {
        return (
            <div className="errors alert alert-danger">Passwords should match.</div>
        );
    }
}

export const showUsernameError = (usernameError) => {

    if (usernameError) {
        return (
            <div className="errors alert alert-danger">Username should be between 2 and 20 symbols.</div>
        );
    }
}

export const showPasswordError = (passwordError) => {

    if (passwordError) {
        return (
            <div className="errors alert alert-danger">Password should be at least 5 symbols.</div>
        );
    }
}

export const showBadCredentialsError = (badCredentials) => {

    if (badCredentials) {
        return (
            <div className="errors alert alert-danger">Invalid username or password.</div>
        );
    }
}