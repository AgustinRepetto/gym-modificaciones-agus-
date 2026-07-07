package org.gym.controller.customer;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.gym.dto.request.customer.CustomerRequest;
import org.gym.dto.response.customer.CustomerResponse;
import org.gym.model.customer.Customer;
import org.gym.service.customer.CustomerCreatorService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerPostController {
    private final CustomerCreatorService customerCreatorService;

    @PostMapping
    //le pasamos los datos de él dto
    public ResponseEntity<CustomerResponse> create(
        @Valid @RequestBody CustomerRequest customerRequest
    ){
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerRequest, customer);
        Customer saved = customerCreatorService.create(customer);

        return ResponseEntity.status(HttpStatus.CREATED).body(CustomerResponse.fromEntity(saved));
    }
}
