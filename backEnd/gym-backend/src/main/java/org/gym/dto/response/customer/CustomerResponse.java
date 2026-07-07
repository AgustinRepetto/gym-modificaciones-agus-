package org.gym.dto.response.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.gym.model.customer.Customer;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {
    private Long id;
    private String fullName;
    private String dni;
    private String phone;
    private LocalDate birthDate;
    private LocalDate registrationDate;
    private Boolean active;

    public static CustomerResponse fromEntity(Customer customer){
        CustomerResponse response = new CustomerResponse();
        BeanUtils.copyProperties(customer, response);
        return response;
    }
}
