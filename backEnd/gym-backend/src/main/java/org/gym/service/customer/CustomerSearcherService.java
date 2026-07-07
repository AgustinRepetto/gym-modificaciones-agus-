package org.gym.service.customer;

import lombok.RequiredArgsConstructor;
import org.gym.model.customer.Customer;
import org.gym.repository.customer.JpaCustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerSearcherService {
    private final JpaCustomerRepository jpaCustomerRepository;

    @Transactional(readOnly = true)
    public Page<Customer> findAll(String search, Pageable pageable) {

        if (search == null || search.trim().isEmpty()) {
            return jpaCustomerRepository.findAll(pageable);
        }
        String text = search.trim();

        //si el usuario escribio un numero
        if (text.matches("\\d+")) {
            Long id = Long.parseLong(text);

            return jpaCustomerRepository.findByIdOrDniContaining(id, text, pageable);

        }
        return jpaCustomerRepository.findByFullNameContainingIgnoreCase(text, pageable);
    }
}
