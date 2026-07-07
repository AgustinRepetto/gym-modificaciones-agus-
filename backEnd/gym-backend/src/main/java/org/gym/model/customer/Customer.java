package org.gym.model.customer;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.gym.model.payment.Payment;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true, length = 20)
    @NotBlank
    private String dni;

    @Column(length = 50)
    @Nullable
    private String phone;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false)
    @NotNull(message = "The registration date is obligatory")
    private LocalDate registrationDate;

    //en un futuro en vez de borrar clientes tienes un historial con Anulados - Activos
    @Column (nullable = false)
    private Boolean active = true;

    //Cascade para la lista de objetos
    //orphan para que no haya datos huérfanos, se saca de la LIST
    //@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    //private List<Payment> payments = new ArrayList<>();
    //por ahora la dejamos comentada
}
