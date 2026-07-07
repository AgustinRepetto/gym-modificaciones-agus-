package org.gym.service.customer;


import lombok.RequiredArgsConstructor;
import org.gym.exception.customer.CustomerNotFoundException;
import org.gym.model.customer.Customer;
import org.gym.repository.customer.JpaCustomerRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerFinderService {

    private final JpaCustomerRepository jpaCustomerRepository;

    public Customer find(Long id){
        return jpaCustomerRepository.findById(id)
                .orElseThrow( () -> new CustomerNotFoundException(id) );
    }
}
