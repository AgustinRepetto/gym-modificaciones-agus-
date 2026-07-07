package org.gym.controller.customer;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.gym.dto.response.customer.CustomerResponse;
import org.gym.dto.request.customer.CustomerUpdateRequest;
import org.gym.service.customer.CustomerUpdaterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerPutController {
    private final CustomerUpdaterService customerUpdaterService;

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody CustomerUpdateRequest request
            ){
        CustomerResponse response = customerUpdaterService.update(request, id);

        return ResponseEntity.ok(response);
    }
}
