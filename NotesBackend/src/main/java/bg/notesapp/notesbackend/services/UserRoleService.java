package bg.notesapp.notesbackend.services;

import bg.notesapp.notesbackend.models.entities.UserRole;
import bg.notesapp.notesbackend.models.enums.Role;
import bg.notesapp.notesbackend.repositories.UserRoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class UserRoleService {
    private final UserRoleRepository userRoleRepository;

    @PostConstruct
    private void initRoles() {

        if (userRoleRepository.count() == 0) {
            Arrays.stream(Role.values()).map(role -> {
                UserRole userRole = new UserRole();
                userRole.setRole(role);
                return userRole;
            }).forEach(userRoleRepository::save);
        }
    }
}
