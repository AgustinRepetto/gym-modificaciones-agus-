package org.gym.service.payment;

import lombok.RequiredArgsConstructor;
import org.gym.dto.response.payment.PaymentResponse;
import org.gym.exception.payment.PaymentNotFoundException;
import org.gym.model.payment.Payment;
import org.gym.repository.payment.JpaPaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentFinderService {
    private final JpaPaymentRepository jpaPaymentRepository;

    //es solo lectura
    //devuelve entidad entera
    @Transactional(readOnly = true)
    public Payment findEntityById(Long id){
        return jpaPaymentRepository.findById(id)
                .orElseThrow(()-> new PaymentNotFoundException(id));
    }

    //es solo lectura
    //es para el updater
    @Transactional(readOnly = true)
    public PaymentResponse execute(Long id){
        Payment payment = findEntityById(id);

      return PaymentResponse.fromEntity(payment);
    }
}
