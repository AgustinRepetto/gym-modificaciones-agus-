package org.gym.controller.customer;

import lombok.RequiredArgsConstructor;
import org.gym.dto.response.customer.CustomerResponse;
import org.gym.model.customer.Customer;
import org.gym.service.customer.CustomerSearcherService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomersGetController {
    private final CustomerSearcherService customerSearcherService;

    @GetMapping
    public ResponseEntity<Page<CustomerResponse>> search(
            @RequestParam(required = false) String search,
            @PageableDefault(page = 0, size=10) Pageable pageable
    ) {
        Page<Customer> customers = customerSearcherService.findAll(search, pageable);
        return ResponseEntity.ok(
                customers.map( CustomerResponse::fromEntity)
        );
    }
}
