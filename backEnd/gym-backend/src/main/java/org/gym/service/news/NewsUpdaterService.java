package org.gym.service.news;

import lombok.RequiredArgsConstructor;
import org.gym.dto.request.news.NewsUpdateRequest;
import org.gym.dto.response.news.NewsResponse;
import org.gym.model.news.News;
import org.gym.repository.news.JpaNewsRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class NewsUpdaterService {
    private final JpaNewsRepository jpaNewsRepository;
    private final NewsFinderService newsFinderService;

    @Transactional
    public NewsResponse update(Long id, NewsUpdateRequest request){
        News news = newsFinderService.findEntityById(id);

        //control para la descripción
        if (request.getDescription() != null && !request.getDescription().isBlank()) {
            news.setDescription(request.getDescription());
        }

        //control de fecha de publicación
        if(request.getPublicationDate() != null){
            news.setPublicationDate(request.getPublicationDate());
        }

        //si se envían nuevos días de vida, se calcula con base en eso
        if(request.getExpirationDate() != null) {
            news.setExpirationDate(request.getExpirationDate());
        } else if (request.getDaysToLive() != null) {
                news.setExpirationDate(news.getPublicationDate().plusDays(request.getDaysToLive()));
            }

        News updateNews = jpaNewsRepository.save(news);

        NewsResponse response = new NewsResponse();
        BeanUtils.copyProperties(updateNews, response);

        return response;
    }
}
