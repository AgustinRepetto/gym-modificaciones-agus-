package org.gym.service.payment;


import lombok.RequiredArgsConstructor;
import org.gym.dto.request.payment.PaymentRequest;
import org.gym.dto.request.payment.PaymentUpdateRequest;
import org.gym.dto.response.payment.PaymentResponse;
import org.gym.model.payment.Payment;
import org.gym.repository.payment.JpaPaymentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PaymentUpdaterService {
    private final JpaPaymentRepository jpaPaymentRepository;
    private final PaymentFinderService paymentFinderService;

    @Transactional
    public PaymentResponse update(PaymentUpdateRequest request, Long id){
        Payment payment = paymentFinderService.findEntityById(id);

        String[] ignoredProperties = getNullAndFixedPropertyNames(request);

        BeanUtils.copyProperties(request, payment, ignoredProperties);

        Payment updated = jpaPaymentRepository.save(payment);
                return PaymentResponse.fromEntity(updated);

    }

    private String[] getNullAndFixedPropertyNames(Object source){
        final BeanWrapper src = new BeanWrapperImpl(source);

        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();

        emptyNames.add("id");
        emptyNames.add("paymentDate");
        emptyNames.add("paymentMethod");
        emptyNames.add("amount");

        for (java.beans.PropertyDescriptor pd :pds){
            Object srcValue = src.getPropertyValue(pd.getName());
            if(srcValue == null){
                emptyNames.add(pd.getName());
            }
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }
}
