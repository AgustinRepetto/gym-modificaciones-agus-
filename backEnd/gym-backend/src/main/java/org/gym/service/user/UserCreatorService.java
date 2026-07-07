package org.gym.service.user;


import lombok.RequiredArgsConstructor;
import org.gym.exception.user.UserEmailAlreadyExistsException;
import org.gym.model.user.Role;
import org.gym.model.user.User;
import org.gym.repository.user.JpaUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserCreatorService {
    private final JpaUserRepository jpaUserRepository;
    private final PasswordEncoder passwordEncoder;

   public User create ( User request ){

        if (jpaUserRepository.existsByEmail(request.getEmail())){
            throw new UserEmailAlreadyExistsException(request.getEmail());
        }
        User user = User.fromRequest(request);

        // Forzamos el rol por defecto en el backend por seguridad
        user.setRole(Role.PROFESOR);

        //validamos si viene con password (local) o de Google
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }else {
            user.setPassword(null);
        }
        return jpaUserRepository.save(user);
   }
}
