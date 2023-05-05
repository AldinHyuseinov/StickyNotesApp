package bg.notesapp.notesbackend.web;

import bg.notesapp.notesbackend.models.dto.NoteDTO;
import bg.notesapp.notesbackend.services.NoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/notes")
public class NoteRestController {
    private final NoteService noteService;

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthRestController.class);

    public NoteRestController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNote(@RequestBody NoteDTO noteDTO, @AuthenticationPrincipal Principal principal) {
        noteService.createNote(noteDTO, principal.getName());
        LOGGER.info("Note created from user: {}", principal.getName());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
