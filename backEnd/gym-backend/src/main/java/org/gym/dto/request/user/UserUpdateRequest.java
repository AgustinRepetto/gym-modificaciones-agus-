package org.gym.dto.request.user;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {

    @Size(min = 5, max = 20, message = "If updated, username must be between 5 and 20 characters long")
    private String username;

    @Size(min = 8, message = "If changed, password must be least 8 characters long")
    private String password;

    private String role;

}

