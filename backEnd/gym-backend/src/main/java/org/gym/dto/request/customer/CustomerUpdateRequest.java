package org.gym.dto.request.customer;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerUpdateRequest {
    private String fullName;
    private String dni; //<- Lo dejo por si el día de mañana cambia a facturación y emite con CUIT también
    @Size(max = 20)
    private String phone;
    private Boolean active;

}
