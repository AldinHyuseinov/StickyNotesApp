package bg.notesapp.notesbackend.services;

import bg.notesapp.notesbackend.models.dto.RegisterUserDTO;
import bg.notesapp.notesbackend.models.entities.User;
import bg.notesapp.notesbackend.models.enums.Role;
import bg.notesapp.notesbackend.repositories.UserRepository;
import bg.notesapp.notesbackend.repositories.UserRoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class AuthService {
    private final UserRepository userRepository;

    private final UserRoleRepository userRoleRepository;

    private final PasswordEncoder passwordEncoder;

    private final ModelMapper mapper;

    @PostConstruct
    private void addGuestUser() {
        if (userRepository.count() == 0) {
            User user = new User();
            user.setUsername("guest");
            user.setPassword(passwordEncoder.encode("guest"));
            user.setRole(userRoleRepository.findByRole(Role.USER));

            userRepository.save(user);
        }
    }

    public void registerUser(RegisterUserDTO registerUserDTO) {
        User user = mapper.map(registerUserDTO, User.class);
        user.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));
        user.setRole(userRoleRepository.findByRole(Role.USER));

        userRepository.save(user);
    }
}
