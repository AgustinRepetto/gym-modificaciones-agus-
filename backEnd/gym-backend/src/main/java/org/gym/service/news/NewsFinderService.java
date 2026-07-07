package org.gym.service.news;


import lombok.RequiredArgsConstructor;
import org.gym.exception.news.NewsNotFoundException;
import org.gym.model.news.News;
import org.gym.repository.news.JpaNewsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NewsFinderService {
    private final JpaNewsRepository jpaNewsRepository;

    @Transactional(readOnly = true)
    public News findEntityById(Long id){
        return jpaNewsRepository.findById(id)
                .orElseThrow(()-> new NewsNotFoundException(id));
    }

}
