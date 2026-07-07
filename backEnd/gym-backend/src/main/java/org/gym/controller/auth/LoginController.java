package org.gym.controller.auth;


import org.gym.dto.request.auth.LoginRequest;
import org.gym.dto.response.auth.LoginResponse;
import org.gym.service.auth.LoginService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) { this.loginService = loginService; }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) { return loginService.login(request); }

}
