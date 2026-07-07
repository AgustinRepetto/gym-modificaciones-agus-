package org.gym.model.payment;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.gym.model.customer.Customer;
import org.gym.model.payment.enums.PaymentMethod;
import org.gym.model.payment.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "The amount cannot be null")
    @Positive(message = "The amount must be greater than zero")
    //Precision para la cant max de dígitos, scale para los números decimales
    @Column(nullable = false, precision =10, scale = 2)
    private BigDecimal amount;

    @NotNull(message = "Payment date cannot be null")
    @Column(nullable = false)
    private LocalDateTime paymentDate;

    //Usamos Enum
    // Centraliza las opciones válidas, impidiendo que se guarden datos inválidos.
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Payment method is required")
    @Column(nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Payment status is required")
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    @Column(length = 255)
    private String description;

    //pertenece a un único cliente específico
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @NotNull(message = "Customer is required")
    private Customer customer;
}
