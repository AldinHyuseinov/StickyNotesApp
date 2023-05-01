package bg.notesapp.notesbackend.web;

import bg.notesapp.notesbackend.models.dto.LoginUserDTO;
import bg.notesapp.notesbackend.models.dto.RegisterUserDTO;
import bg.notesapp.notesbackend.services.AuthService;
import bg.notesapp.notesbackend.utils.JwtUtil;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import static bg.notesapp.notesbackend.utils.ErrorHelper.hasErrors;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {
    private final AuthService authService;

    private final AuthenticationProvider authenticationProvider;

    private final JwtUtil jwtTokenUtil;

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthRestController.class);

    public AuthRestController(AuthService authService, AuthenticationProvider authenticationProvider, JwtUtil jwtTokenUtil) {
        this.authService = authService;
        this.authenticationProvider = authenticationProvider;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterUserDTO registerUserDTO, BindingResult bindingResult) {
        hasErrors(bindingResult);
        authService.registerUser(registerUserDTO);
        LOGGER.info("Registered user with username: {}", registerUserDTO.getUsername());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDTO request) {

        try {
            Authentication authenticate = authenticationProvider
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, jwtTokenUtil.generateToken(authenticate.getName()))
                    .body(authenticate.getName());
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
