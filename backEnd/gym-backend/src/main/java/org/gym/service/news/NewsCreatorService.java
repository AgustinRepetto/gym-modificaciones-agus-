package org.gym.service.news;

import lombok.RequiredArgsConstructor;
import org.gym.dto.request.news.NewsRequest;
import org.gym.dto.response.news.NewsResponse;
import org.gym.model.news.News;
import org.gym.repository.news.JpaNewsRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NewsCreatorService {
    private final JpaNewsRepository jpaNewsRepository;

    @Transactional
    public NewsResponse create (NewsRequest request){
        News news = new News();

        news.setDescription(request.getDescription());

        //Fecha de publicación si manda se 'programa' si no sale
        if (request.getPublicationDate() != null) {
            news.setPublicationDate(request.getPublicationDate());
        } else {
            news.setPublicationDate(LocalDateTime.now());
        }
        //para mandarle la cantidad de tiempo que va a 'vivir' la noticia hasta que expire
        news.setExpirationDate(news.getPublicationDate().plusDays(request.getDaysToLive()));
        //guardamos
        News savedNews = jpaNewsRepository.save(news);

        //Dto de respuesta
        NewsResponse response = new NewsResponse();
        BeanUtils.copyProperties(savedNews, response);

        return response;
    }
}
