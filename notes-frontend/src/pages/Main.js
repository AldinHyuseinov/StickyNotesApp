import { useEffect, useState, useRef } from "react";
import { clearUserData, getUserData } from "../utils/UserUtil";
import { showIfBlankFields } from "../utils/FormUtils";

function MainPage() {
    const userData = getUserData()
    const [notes, setNotes] = useState([])
    const [blankFields, setBlankFields] = useState(false)
    const [currentNote, setCurrentNote] = useState({})
    const title = useRef()
    const content = useRef()

    useEffect(() => {
        const requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + userData.authorization
            }
        }

        fetch("http://localhost:8000/api/notes/all", requestOptions)
            .then(response => {

                if (response.status === 401) {
                    clearUserData()
                    return
                }
                return response.json()
            })
            .then(data => setNotes(data))
    }, [notes.length])

    const handleAdding = () => {

        if (title.current.value === "" && content.current.value === "") {
            setBlankFields(true)
            return
        }

        const data = {
            title: title.current.value.length <= 20 ? title.current.value : title.current.value.substring(0, 20),
            content: content.current.value
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userData.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch("http://localhost:8000/api/notes/create", requestOptions)
            .then(response => response.json())
            .then(data => {
                setNotes([...notes, data])
                setBlankFields(false)
            })

        title.current.value = "";
        content.current.value = "";
    }

    const handleRemove = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + userData.authorization
            }
        }

        fetch(`http://localhost:8000/api/notes/delete/${id}`, requestOptions)
            .then(response => {

                if (response.ok) {
                    setNotes(notes.filter(n => n.id !== id))
                }
            })
    }

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
                            {showIfBlankFields(blankFields)}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Title:</label>
                                    <input type="text" className="form-control" id="title" ref={title} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="col-form-label">Content:</label>
                                    <textarea className="form-control" id="content" ref={content}></textarea>
                                </div>
                            </form>

                            <div className="sticky-note-modal-footer">
                                <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-warning" onClick={handleAdding}>Add note</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel" style={{ width: '33%' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">View your note</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div classnName="offcanvas-body">
                    <div className="sticky-note bg-warning-subtle" >
                        <h3 className="mt-0">{currentNote.title}</h3>
                        <p>{currentNote.content}</p>
                    </div>
                </div>
            </div>

            <div className="row">
                {notes.map(note => {
                    return (
                        <div className="col-lg-2 mb-3">
                            <div className="sticky-note bg-warning-subtle" >
                                <h4 className="mt-0">{note.title}</h4>
                                <p>{note.content.length > 45 ? note.content.substring(0, 45) + "..." : note.content}</p>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-sm btn-warning me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"
                                        onClick={() => setCurrentNote(note)}>View</button>
                                    <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemove(note.id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    );
}

export default MainPage;