package bg.notesapp.notesbackend.repositories;

import bg.notesapp.notesbackend.models.entities.UserRole;
import bg.notesapp.notesbackend.models.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    UserRole findByRole(Role role);
}
