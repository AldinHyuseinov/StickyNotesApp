package bg.notesapp.notesbackend.services;

import bg.notesapp.notesbackend.models.dto.NoteDTO;
import bg.notesapp.notesbackend.models.entities.User;
import bg.notesapp.notesbackend.repositories.NoteRepository;
import bg.notesapp.notesbackend.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class NoteServiceTest {
    private NoteService toTest;

    @Mock
    private NoteRepository mockNoteRepository;

    @Mock
    private UserRepository mockUserRepository;

    private static final String USERNAME = "Pesho";

    @BeforeEach
    public void setup() {
        toTest = new NoteService(mockNoteRepository, mockUserRepository, new ModelMapper());
    }

    @Test
    public void testCreatingNote() {
        NoteDTO mockNote = new NoteDTO();
        mockNote.setContent("");
        mockNote.setTitle("");

        User mockUser = new User();
        mockUser.setUsername(USERNAME);

        when(mockUserRepository.findByUsername(USERNAME)).thenReturn(Optional.of(mockUser));

        assertThrows(IllegalArgumentException.class, () -> toTest.createNote(mockNote, USERNAME));

        mockNote.setContent("Program");
        mockNote.setTitle("");

        toTest.createNote(mockNote, USERNAME);

        verify(mockNoteRepository).save(any());
    }
}
