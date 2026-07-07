package org.gym.controller.user;

import org.gym.dto.request.user.UserUpdateRequest;
import org.gym.dto.response.user.UserResponse;
import org.gym.model.user.Role;
import org.gym.model.user.User;
import org.gym.repository.user.JpaUserRepository;
import org.gym.service.user.UserUpdaterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserPutController {
    private final UserUpdaterService userUpdaterService;
    private final JpaUserRepository userRepository;

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request
            ){
        // 1. Obtener el email del usuario autenticado desde el SecurityContext
        String emailAutenticado = SecurityContextHolder.getContext().getAuthentication().getName();

        // 2. Buscar el usuario autenticado en la base de datos
        User usuarioLogueado = userRepository.findByEmail(emailAutenticado).orElse(null);

        // 3. Validar si está logueado
        if (usuarioLogueado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Debes iniciar sesión.");
        }

        // 4. Validar si tiene el rango requerido
        if (usuarioLogueado.getRole() != Role.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permisos de Administrador para realizar esta acción.");
        }

        // 5. Si pasa las validaciones, se ejecuta la acción
        User user = userUpdaterService.update(request, id);
        UserResponse response = UserResponse.fromEntity(user);
        return ResponseEntity.ok(response);
    }
}
