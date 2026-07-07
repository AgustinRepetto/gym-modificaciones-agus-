package org.gym.service.payment;

import lombok.RequiredArgsConstructor;
import org.gym.exception.payment.PaymentNotFoundException;
import org.gym.model.payment.Payment;
import org.gym.repository.payment.JpaPaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentDeleterService {
    private final JpaPaymentRepository jpaPaymentRepository;

    @Transactional
    public void delete (Long id){
        Payment payment = jpaPaymentRepository.findById(id)
                .orElseThrow(() -> new PaymentNotFoundException(id));
        jpaPaymentRepository.delete(payment);
    }

}
