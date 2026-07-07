package org.gym.dto.response.payment;


import lombok.*;
import org.gym.model.payment.Payment;


import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponse {
    private Long id;
    private BigDecimal amount;
    private LocalDateTime paymentDate;
    private String paymentMethod;
    private String paymentStatus;
    private String description;
    private Long customerId;
    private String customerName;

    public static PaymentResponse fromEntity(Payment payment){
        if (payment == null) return null;

        return PaymentResponse.builder()
                .id(payment.getId())
                .amount(payment.getAmount())
                .paymentDate(payment.getPaymentDate())
                //Operador ternario
                //condición (?) true si viene con valor, (:) false si no viene con valor
                .paymentMethod(payment.getPaymentMethod() != null ? payment.getPaymentMethod().name() : null)
                .paymentStatus(payment.getPaymentStatus() != null ? payment.getPaymentStatus().name() : null)
                .description(payment.getDescription())
                .customerId(payment.getCustomer().getId())
                .customerName(payment.getCustomer().getFullName())
                .build();
    }
}
