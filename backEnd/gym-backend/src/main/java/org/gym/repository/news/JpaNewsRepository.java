package org.gym.repository.news;

import org.gym.model.news.News;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JpaNewsRepository extends JpaRepository<News, Long>, JpaSpecificationExecutor <News>{
    //Para las activas, se publicaron(berfore) y todavia no vencieron(after)
    List<News> findByPublicationDateBeforeAndExpirationDateAfter(
            LocalDateTime nowForPub,
            LocalDateTime nowForExp,
            Pageable pageable);

    //Para ver las programadas que todavia no salieron
    List<News> findByPublicationDateAfter(
            LocalDateTime now,
            Pageable pageable);

    //Para las expiradas anuladas
    List<News> findByExpirationDateBefore(
            LocalDateTime now,
            Pageable pageable);

    //thresholdDate -> fecha limite
    @Modifying
    @Query("DELETE FROM News n WHERE n.expirationDate < :thresholdDate")
    void deleteExpiredOlderThan(LocalDateTime thresholdDate);
}

