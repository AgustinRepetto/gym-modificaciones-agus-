package org.gym.service.user;


import lombok.RequiredArgsConstructor;
import org.gym.model.user.User;
import org.gym.repository.user.JpaUserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDeleterService {
    private final JpaUserRepository jpaUserRepository;
    private final UserFinderService userFinderService;

    public void delete (Long id){
        User user = userFinderService.find(id);
        jpaUserRepository.deleteById(id);
    }
}
