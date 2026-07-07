package org.gym.service.payment;

import lombok.RequiredArgsConstructor;
import org.gym.dto.response.payment.PaymentResponse;
import org.gym.repository.payment.JpaPaymentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentSearcherService {
    private final JpaPaymentRepository jpaPaymentRepository;

    @Transactional(readOnly = true)
    public Page<PaymentResponse> execute(Pageable pageable){
        return jpaPaymentRepository.findAll(pageable)

                .map(PaymentResponse::fromEntity);
        //.map(payment -> PaymentResponse.fromEntity(payment) es lo mismo que lo de arriba
    }
}
