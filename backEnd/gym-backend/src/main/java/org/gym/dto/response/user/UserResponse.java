package org.gym.dto.response.user;

import org.gym.model.user.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // <-contains getters and setters, hashCode, etc
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private boolean hasPassword;
    private String role;

    public static UserResponse fromEntity(User user){
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());

        //si el password no es NULL y no está vacio = TRUE <-tiene clave en la app
        //si es NULL = TRUE <- inicio con Google, no tiene clave en la app
        response.setHasPassword(user.getPassword() != null && !user.getPassword().isEmpty());
        response.setRole(user.getRole().toString());
        return response;
    }
}