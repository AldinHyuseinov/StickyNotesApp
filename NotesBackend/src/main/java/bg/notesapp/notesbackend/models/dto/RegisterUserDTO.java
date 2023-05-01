package bg.notesapp.notesbackend.models.dto;

import bg.notesapp.notesbackend.utils.validations.annotations.FieldMatch;
import bg.notesapp.notesbackend.utils.validations.annotations.UniqueUsername;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@FieldMatch(first = "password", second = "confirmPassword")
public class RegisterUserDTO {
    @Size(min = 2, max = 20, message = "Username should be between 2 and 20 symbols.")
    @UniqueUsername
    private String username;

    @Size(min = 5, message = "Password should be at least 5 symbols.")
    private String password;

    @Size(min = 5, message = "Confirm password should be at least 5 symbols.")
    private String confirmPassword;
}
