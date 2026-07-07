package org.gym.dto.request.payment;


import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentRequest {
    @NotNull(message = "The amount cannot be null")
    @Positive(message = "The amount must be greater than zero")
    private BigDecimal amount;

    @NotNull(message = "Payment method is required")
    private String paymentMethod;

    @NotNull(message = "Payment Status is required")
    private String paymentStatus;

    @NotNull(message = "Payment date cannot be null")
    private LocalDateTime paymentDate;

    @Size(max = 255, message = "The description cannot exceed 255 characters")
    private String description;

    @NotNull(message = "Customer ID is required")
    private Long customerId;
}
