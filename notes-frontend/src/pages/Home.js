function Home() {
    return (
        <main className="container my-5">
            <div className="row">
                <h1 className="text-center">Welcome to Notes!</h1>
                <h2 className="text-center"><a className="link-warning" href="/auth/login">Login</a> to access and create your own notes!</h2>
                <h2 className="text-center"><a className="link-warning" href="/auth/register">Register</a> if you don't have an account.</h2>
            </div>
        </main>
    );
}

export default Home;