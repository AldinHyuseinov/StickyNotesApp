package bg.notesapp.notesbackend.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class AddNoteDTO {
    private String title;

    private String content;
}
