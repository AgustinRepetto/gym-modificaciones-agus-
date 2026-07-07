package org.gym.service.user;

import org.gym.dto.request.user.UserUpdateRequest;
import org.gym.model.user.Role;
import org.gym.model.user.User;
import org.gym.repository.user.JpaUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserUpdaterService {
    private final JpaUserRepository jpaUserRepository;
    private final UserFinderService userFinderService;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    public User update (UserUpdateRequest userRequest, Long id){
        User user = userFinderService.find(id);
        //SI el username no es nulo Y NO está vacío (o con espacios) se actualiza
        if (userRequest.getUsername() !=null
                && !userRequest.getUsername().isBlank()) {
            user.setUsername(userRequest.getUsername());
        }

        if(userRequest.getPassword() != null &&
        !userRequest.getPassword().isBlank()){
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        // Actualizar rol si se proporciona
        if (userRequest.getRole() != null && !userRequest.getRole().isBlank()) {
            try {
                Role role = Role.valueOf(userRequest.getRole().toUpperCase());
                user.setRole(role);
            } catch (IllegalArgumentException e) {
                // Si el rol no es válido, se ignora
            }
        }

        return jpaUserRepository.save(user);
    }
}
