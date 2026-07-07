package org.gym.service.user;

import org.gym.exception.user.UserNotFoundException;
import org.gym.model.user.User;
import org.gym.repository.user.JpaUserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserFinderService {
    private final JpaUserRepository jpaUserRepository;

    public UserFinderService(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }
    public User find(Long id){
        return jpaUserRepository.findById(id)
                .orElseThrow( () -> new UserNotFoundException(id));
    }
}
