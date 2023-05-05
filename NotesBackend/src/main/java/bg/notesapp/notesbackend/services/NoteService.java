package bg.notesapp.notesbackend.services;

import bg.notesapp.notesbackend.models.dto.NoteDTO;
import bg.notesapp.notesbackend.models.entities.Note;
import bg.notesapp.notesbackend.repositories.NoteRepository;
import bg.notesapp.notesbackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class NoteService {
    private final NoteRepository noteRepository;

    private final UserRepository userRepository;

    private final ModelMapper mapper;

    public void createNote(NoteDTO noteDTO, String username) {

        if (noteDTO.getTitle().isBlank() && noteDTO.getContent().isBlank()) {
            throw new IllegalArgumentException("Blank note!");
        }

        Note note = mapper.map(noteDTO, Note.class);
        note.setUser(userRepository.findByUsername(username).orElse(null));

        noteRepository.save(note);
    }
}
