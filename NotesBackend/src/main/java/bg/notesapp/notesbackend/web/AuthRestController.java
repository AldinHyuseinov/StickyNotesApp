package bg.notesapp.notesbackend.web;

import bg.notesapp.notesbackend.services.AuthService;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/auth")
public class AuthRestController {
    private final AuthService authService;

    public AuthRestController(AuthService authService) {
        this.authService = authService;
    }
}
