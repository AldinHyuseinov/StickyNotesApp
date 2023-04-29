package bg.notesapp.notesbackend.repositories;

import bg.notesapp.notesbackend.models.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
}
