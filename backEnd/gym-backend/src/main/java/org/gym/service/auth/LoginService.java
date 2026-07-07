package org.gym.service.auth;


import org.gym.dto.request.auth.LoginRequest;
import org.gym.dto.response.auth.LoginResponse;
import org.gym.exception.auth.WrongPasswordException;
import org.gym.exception.user.UserNotFoundByEmailException;
import org.gym.model.user.User;
import org.gym.repository.user.JpaUserRepository;
import org.gym.service.jwt.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final JpaUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

public LoginResponse login (LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow( () -> new UserNotFoundByEmailException(request.getEmail()));


        if (user.getPassword() == null){
            throw new WrongPasswordException();
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
        {
            throw new WrongPasswordException();
        }
        String token = jwtService.generateToken(user);
        return new LoginResponse(token, user.getId(), user.getUsername(), user.getEmail(), user.getRole().toString());
}

}
