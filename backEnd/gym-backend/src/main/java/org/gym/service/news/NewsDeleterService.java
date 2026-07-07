package org.gym.service.news;


import lombok.RequiredArgsConstructor;
import org.gym.model.news.News;
import org.gym.repository.news.JpaNewsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NewsDeleterService {
    private final JpaNewsRepository jpaNewsRepository;
    private final NewsFinderService newsFinderService;

    @Transactional
    public void delete (Long id){
        News news = newsFinderService.findEntityById(id);
        jpaNewsRepository.delete(news);
    }
}
