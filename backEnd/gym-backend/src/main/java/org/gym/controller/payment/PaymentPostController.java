package org.gym.controller.payment;


import org.gym.dto.request.payment.PaymentRequest;
import org.gym.dto.response.payment.PaymentResponse;
import org.gym.model.user.Role;
import org.gym.model.user.User;
import org.gym.repository.user.JpaUserRepository;
import org.gym.service.payment.PaymentCreatorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentPostController {
    private final PaymentCreatorService paymentCreatorService;
    private final JpaUserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> create(
            @Valid @RequestBody PaymentRequest paymentRequest
            ){
        // 1. Obtener el email del usuario autenticado desde el SecurityContext
        String emailAutenticado = SecurityContextHolder.getContext().getAuthentication().getName();
        User usuarioLogueado = userRepository.findByEmail(emailAutenticado).orElse(null);

        // 2. Validar si está logueado
        if (usuarioLogueado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Debes iniciar sesión.");
        }

        // 3. Validar si tiene el rango requerido
        if (usuarioLogueado.getRole() != Role.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permisos de Administrador para realizar esta acción.");
        }

        // 4. Si pasa las validaciones, se ejecuta la acción
        PaymentResponse response = paymentCreatorService.create(paymentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
