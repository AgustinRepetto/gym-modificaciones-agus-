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
public class NewsGetExpiredController {
    private final NewsSearcherService newsSearcherService;

    @GetMapping("/expired")
    public ResponseEntity<List<NewsResponse>> getExpired(@RequestParam(defaultValue = "10") int limit){
        List<NewsResponse> responses = newsSearcherService.findExpiredNews(limit);
        return ResponseEntity.ok(responses);
    }
}
