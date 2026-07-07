package org.gym.dto.request.news;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewsRequest {

    private String description;
    private Integer daysToLive;
    private LocalDateTime publicationDate;
}
