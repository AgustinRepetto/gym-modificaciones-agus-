package org.gym.service.user;

import lombok.RequiredArgsConstructor;
import org.gym.model.user.User;
import org.gym.repository.user.JpaUserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSearcherService {
    private final JpaUserRepository jpaUserRepository;

    public Page<User> findAll(Pageable pageable) {
        return jpaUserRepository.findAll(pageable);
    }
}
