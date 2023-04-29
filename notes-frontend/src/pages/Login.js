import FormFields from "../components/FormFields";

function LoginPage() {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Login</h1>
            <form>
                <FormFields />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;