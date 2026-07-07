package org.gym.controller.auth;

import org.gym.dto.response.auth.GoogleUserDto;
import org.gym.dto.response.auth.LoginResponse;
import org.gym.service.auth.GoogleAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class GoogleAuthController {

    private final GoogleAuthService googleAuthService;

    public GoogleAuthController(GoogleAuthService googleAuthService){
        this.googleAuthService = googleAuthService;
    }

    @GetMapping("/google/callback")
    public ResponseEntity<LoginResponse> googleCallback(@RequestParam("code") String code) throws Exception {
        //Metemos los datos de Google para poder manejarlos
        GoogleUserDto googleUser = googleAuthService.verifyCodeGoogle(code);
        // DTO interno para buscar o registrar al usuario en base de datos.
        // Genera token de seguridad y se arma la respuesta para la app
        LoginResponse loginResponse = googleAuthService.processLoginOrRegister(googleUser);
        //Salida de los datos mapeados
        return ResponseEntity.ok(loginResponse);
    }
}
