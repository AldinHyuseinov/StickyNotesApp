package bg.notesapp.notesbackend.models.entities;

import bg.notesapp.notesbackend.models.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@Getter
@Setter
public class UserRole extends BaseEntity {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
}
