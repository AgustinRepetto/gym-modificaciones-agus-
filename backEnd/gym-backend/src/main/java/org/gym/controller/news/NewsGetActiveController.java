package org.gym.controller.news;

import lombok.RequiredArgsConstructor;
import org.gym.dto.response.news.NewsResponse;
import org.gym.service.news.NewsSearcherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/news")
public class NewsGetActiveController {
    private final NewsSearcherService newsSearcherService;

    @GetMapping("/active")
    public ResponseEntity<List<NewsResponse>> getActive(
            @RequestParam(defaultValue = "10") int limit){
        List<NewsResponse> responses = newsSearcherService.findActiveNews(limit);
        return ResponseEntity.ok(responses);
    }
}
