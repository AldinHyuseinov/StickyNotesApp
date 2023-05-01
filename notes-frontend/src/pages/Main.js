import { getUserData } from "../utils/UserUtil";

function MainPage() {
    const userData = getUserData();
    
    return (
        <main className="container my-5">
            <h1 className="text-center">Welcome, {userData.username}!</h1>
        </main>
    );
}

export default MainPage;