package org.gym.dto.request.news;

import jakarta.annotation.Nullable;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewsUpdateRequest {

    private String description;
    private Integer daysToLive;
    private LocalDateTime publicationDate;
    private LocalDateTime expirationDate;

}
