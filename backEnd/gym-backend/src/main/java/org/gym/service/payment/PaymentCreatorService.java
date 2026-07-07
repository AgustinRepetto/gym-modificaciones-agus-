package org.gym.service.payment;

import lombok.RequiredArgsConstructor;
import org.gym.dto.request.payment.PaymentRequest;
import org.gym.dto.response.payment.PaymentResponse;
import org.gym.model.customer.Customer;
import org.gym.model.payment.Payment;
import org.gym.model.payment.enums.PaymentMethod;
import org.gym.model.payment.enums.PaymentStatus;
import org.gym.repository.payment.JpaPaymentRepository;
import org.gym.service.customer.CustomerFinderService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentCreatorService {
    private final JpaPaymentRepository jpaPaymentRepository;
    private final CustomerFinderService customerFinderService;

    @Transactional
    public PaymentResponse create (PaymentRequest request){

        Customer customer = customerFinderService.find(request.getCustomerId());

        Payment payment = new Payment();
        BeanUtils.copyProperties(request, payment);

        payment.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase()));
        payment.setPaymentStatus(PaymentStatus.valueOf(request.getPaymentStatus().toUpperCase()));

        payment.setCustomer(customer);
        Payment saved = jpaPaymentRepository.save(payment);

        return PaymentResponse.fromEntity(saved);
    }
}
