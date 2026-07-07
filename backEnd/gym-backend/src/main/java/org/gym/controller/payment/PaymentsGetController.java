package org.gym.controller.payment;

import lombok.RequiredArgsConstructor;
import org.gym.dto.response.payment.PaymentResponse;
import org.gym.service.payment.PaymentSearcherService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentsGetController {
    private final PaymentSearcherService paymentSearcherService;

    @GetMapping
    public ResponseEntity<Page<PaymentResponse>> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        Pageable pageable = PageRequest.of(page, size);

        Page<PaymentResponse> response = paymentSearcherService.execute(pageable);
        return ResponseEntity.ok(response);
    }
}
