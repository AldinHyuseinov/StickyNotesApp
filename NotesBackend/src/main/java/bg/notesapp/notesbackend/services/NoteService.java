package bg.notesapp.notesbackend.services;

import bg.notesapp.notesbackend.models.dto.AddNoteDTO;
import bg.notesapp.notesbackend.models.dto.NoteDTO;
import bg.notesapp.notesbackend.models.entities.Note;
import bg.notesapp.notesbackend.repositories.NoteRepository;
import bg.notesapp.notesbackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class NoteService {
    private final NoteRepository noteRepository;

    private final UserRepository userRepository;

    private final ModelMapper mapper;

    public NoteDTO createNote(AddNoteDTO addNoteDTO, String username) {

        if (addNoteDTO.getTitle().isBlank() && addNoteDTO.getContent().isBlank()) {
            throw new IllegalArgumentException("Blank note!");
        }

        Note note = mapper.map(addNoteDTO, Note.class);
        note.setUser(userRepository.findByUsername(username).orElse(null));

        noteRepository.save(note);

        return mapper.map(note, NoteDTO.class);
    }

    public List<NoteDTO> getNotesForUser(String username) {
        return noteRepository.findAllByUserUsername(username)
                .stream().map(note -> mapper.map(note, NoteDTO.class))
                .collect(Collectors.toList());
    }

    public void deleteNoteById(Long id) {
        noteRepository.deleteById(id);
    }

    public void modifyNote(NoteDTO noteDTO) {
        Note note = noteRepository.findById(noteDTO.getId()).orElse(null);
        note.setTitle(noteDTO.getTitle());
        note.setContent(noteDTO.getContent());

        noteRepository.save(note);
    }
}
