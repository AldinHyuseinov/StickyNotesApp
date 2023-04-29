package bg.notesapp.notesbackend.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notes")
@NoArgsConstructor
@Getter
@Setter
public class Note extends BaseEntity {
    private String title;

    private String content;

    @ManyToOne
    private User user;
}
