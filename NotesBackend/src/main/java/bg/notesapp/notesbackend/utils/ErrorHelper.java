package bg.notesapp.notesbackend.utils;

import bg.notesapp.notesbackend.utils.exceptions.FormException;
import org.springframework.validation.BindingResult;

import java.util.HashMap;
import java.util.Map;

public class ErrorHelper {

    public static void hasErrors(BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> fieldAndMessage = new HashMap<>();
            bindingResult.getFieldErrors().forEach(fieldError -> fieldAndMessage.put(fieldError.getField(),
                    fieldError.getDefaultMessage()));
            throw new FormException(fieldAndMessage);
        }
    }
}
