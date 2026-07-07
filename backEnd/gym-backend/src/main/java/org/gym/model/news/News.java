package org.gym.model.news;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "news")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    String description;

    @Column(nullable = false)
    LocalDateTime createdAt;

    @Column(nullable = false)
    LocalDateTime expirationDate;

    //por si hay noticias programadas
    @Column(nullable = false)
    LocalDateTime publicationDate;

    //para no settear la fecha manualmente
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
