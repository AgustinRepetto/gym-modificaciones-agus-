package org.gym.service.news;


import lombok.RequiredArgsConstructor;
import org.gym.dto.response.news.NewsResponse;
import org.gym.model.news.News;
import org.gym.repository.news.JpaNewsRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsSearcherService {

    private final JpaNewsRepository jpaNewsRepository;


    //para listar los ACTIVOS
    @Transactional(readOnly = true)
    public List<NewsResponse> findActiveNews(int limit){
        //para listar la cantidad que queremos con limit
        Pageable pageable = PageRequest.of(0, limit);
        LocalDateTime now = LocalDateTime.now();
        List<News> activeNews = jpaNewsRepository
                .findByPublicationDateBeforeAndExpirationDateAfter(now, now, pageable);

        //stream permite operar sobre los elementos en transito
        return activeNews.stream()
                //transforma cada pieza, y le asigna las propiedades con beanUtils
                .map(news -> {
                    NewsResponse response = new NewsResponse();
                    BeanUtils.copyProperties(news, response);
                    return  response;
                })
                //agarra las propiedades asignadas y las empaqueta en el Response
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NewsResponse> findScheduledNews(int limit){
        Pageable pageable = PageRequest.of(0, limit);

        List<News> scheduledNews = jpaNewsRepository
                .findByPublicationDateAfter(LocalDateTime.now(), pageable);

        return scheduledNews.stream()
                .map(news -> {
                    NewsResponse response = new NewsResponse();
                    BeanUtils.copyProperties(news, response);
                    return response;
                })
                .collect(Collectors.toList());
    }



    //para listar los Anulados
    @Transactional(readOnly = true)
    public List<NewsResponse> findExpiredNews(int limit){
        Pageable pageable = PageRequest.of(0, limit);

        List<News> expiredNews = jpaNewsRepository.findByExpirationDateBefore(LocalDateTime.now(), pageable);

        return expiredNews.stream()
                .map(news -> {
                    NewsResponse response = new NewsResponse();
                    BeanUtils.copyProperties(news, response);
                    return response;
                })
                .collect(Collectors.toList());
    }
}
