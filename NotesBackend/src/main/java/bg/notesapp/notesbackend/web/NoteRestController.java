package bg.notesapp.notesbackend.web;

import bg.notesapp.notesbackend.models.dto.AddNoteDTO;
import bg.notesapp.notesbackend.models.dto.NoteDTO;
import bg.notesapp.notesbackend.services.NoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteRestController {
    private final NoteService noteService;

    private static final Logger LOGGER = LoggerFactory.getLogger(NoteRestController.class);

    public NoteRestController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNote(@RequestBody AddNoteDTO addNoteDTO, Principal principal) {
        NoteDTO noteDTO = noteService.createNote(addNoteDTO, principal.getName());
        LOGGER.info("Note created from user: {}", principal.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(noteDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<List<NoteDTO>> getAllNotes(Principal principal) {
        LOGGER.info("Retrieved all notes.");

        return ResponseEntity.ok(noteService.getNotesForUser(principal.getName()));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNoteById(@PathVariable Long id) {
        noteService.deleteNoteById(id);
        LOGGER.info("Note deleted with id: {}", id);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/change")
    public ResponseEntity<?> changeNoteInfo(@RequestBody NoteDTO noteDTO) {
        noteService.modifyNote(noteDTO);
        LOGGER.info("Modified note with id: {}", noteDTO.getId());

        return ResponseEntity.ok().build();
    }
}
