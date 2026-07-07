package org.gym.dto.response.news;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewsResponse {

    private Long id;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime expirationDate;
    private LocalDateTime publicationDate;
}
