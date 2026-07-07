package org.gym.controller.payment;

import lombok.RequiredArgsConstructor;
import org.gym.dto.response.payment.PaymentResponse;
import org.gym.model.payment.Payment;
import org.gym.service.payment.PaymentFinderService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentGetController {
    private final PaymentFinderService paymentFinderService;

    @GetMapping("/{id}")
    //le pasamos el execute asi el servicio hace la búsqueda
    public ResponseEntity<PaymentResponse> find(@PathVariable Long id){
        PaymentResponse response = paymentFinderService.execute(id);
        return ResponseEntity.ok(response);
    }
}
