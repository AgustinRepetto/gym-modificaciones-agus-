package org.gym.controller.customer;

import lombok.RequiredArgsConstructor;
import org.gym.dto.response.customer.CustomerResponse;
import org.gym.model.customer.Customer;
import org.gym.service.customer.CustomerFinderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerGetController {
    private final CustomerFinderService customerFinderService;

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> find(@PathVariable Long id){
        Customer customer = customerFinderService.find(id);
        return ResponseEntity.ok(CustomerResponse.fromEntity(customer));
    }
}
