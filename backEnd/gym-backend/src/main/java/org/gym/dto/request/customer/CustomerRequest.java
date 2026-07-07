package org.gym.dto.request.customer;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {
    private String fullName;
    private String dni;
    private String phone;
    private LocalDate birthDate;
    private LocalDate registrationDate;
    private Boolean active;
}
