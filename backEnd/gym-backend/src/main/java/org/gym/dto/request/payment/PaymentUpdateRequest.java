package org.gym.dto.request.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.gym.model.payment.enums.PaymentStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentUpdateRequest {
    private PaymentStatus paymentStatus;
    private String description;
}
