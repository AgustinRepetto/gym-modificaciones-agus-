package org.gym.dto.request.user;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

@NotBlank(message = "Username is required")
@Size(min = 5, max = 20, message = "Username must be between 5 and 20 characters long")
private String username;

@NotBlank (message = "Email is required")
@Email(message = "Invalid email format")
    private String email;

@NotBlank
    @Size(min = 8)
    private String password;


}
