import { getUserData } from "../utils/UserUtil";

function MainPage() {
    const userData = getUserData();

    return (
        <main className="container my-5">
            <h1 className="text-center">Welcome, {userData.username}!</h1>
            <div className="row">
                <div className="col-4"></div>
                <button type="button" className="col-4 mb-3 btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Add new note</button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="sticky-note-modal">
                        <div className="sticky-note bg-warning-subtle">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Title:</label>
                                    <input type="text" className="form-control" id="title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="col-form-label">Content:</label>
                                    <textarea className="form-control" id="content"></textarea>
                                </div>
                            </form>

                            <div className="sticky-note-modal-footer">
                                <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-warning">Add note</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-2 mb-3">
                    <div className="sticky-note bg-warning-subtle">
                        <h3 className="mt-0">Title</h3>
                        <p>Lorem ipsum dolor sit amet...</p>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-sm btn-warning me-2">Change</button>
                            <button type="button" className="btn btn-sm btn-danger">Remove</button>
                        </div>
                    </div>
                </div>

                <div className="col-lg-2 mb-3">
                    <div className="sticky-note bg-warning-subtle">
                        <h3 className="mt-0">Title</h3>
                        <p>Lorem ipsum dolor sit amet...</p>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-sm btn-warning me-2">Change</button>
                            <button type="button" className="btn btn-sm btn-danger">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainPage;