package org.gym.model.user;

import java.util.Objects;

import org.jspecify.annotations.NonNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank
    @Size(min = 2, message = "Invalid text length")
    private String username;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email format" )
    private String email;

    @Column
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(name = "auth_provider" , nullable= false)
    private String authProvider = "LOCAL";

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role = Role.PROFESOR;

    public static User fromRequest(@NonNull User request){
        Objects.requireNonNull(request, "Request cannot be null");

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        String reqPassword = request.getPassword();
        user.setPassword(reqPassword != null && reqPassword.isBlank() ? null : reqPassword);

        user.setAuthProvider(
                request.getAuthProvider() != null && !request.getAuthProvider().isBlank()
                        ? request.getAuthProvider() : "LOCAL");

        return user;
    }
}