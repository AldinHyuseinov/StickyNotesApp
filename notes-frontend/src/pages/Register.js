import FormFields from "../components/FormFields";

function RegisterPage() {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Register</h1>
            <form>
                <FormFields />
                <div className="row mb-3">
                    <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="confirmPassword" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;