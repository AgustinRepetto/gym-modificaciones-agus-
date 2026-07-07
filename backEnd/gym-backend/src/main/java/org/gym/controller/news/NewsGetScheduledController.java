package org.gym.controller.news;

import lombok.RequiredArgsConstructor;
import org.gym.dto.response.news.NewsResponse;
import org.gym.service.news.NewsSearcherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsGetScheduledController {
    private final NewsSearcherService newsSearcherService;

    @GetMapping("/scheduled")
    public ResponseEntity<List<NewsResponse>> getScheduled(
        @RequestParam(defaultValue = "10" ) int limit){
        List<NewsResponse> responses = newsSearcherService.findScheduledNews(limit);

        return ResponseEntity.ok(responses);
    }
}
