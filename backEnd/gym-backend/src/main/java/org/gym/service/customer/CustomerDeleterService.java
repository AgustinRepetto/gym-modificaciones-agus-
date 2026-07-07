package org.gym.service.customer;


import lombok.RequiredArgsConstructor;
import org.gym.model.customer.Customer;
import org.gym.repository.customer.JpaCustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerDeleterService {
    private final JpaCustomerRepository jpaCustomerRepository;
    private final CustomerFinderService customerFinderService;

    @Transactional
    public void delete (Long id){
        Customer customer = customerFinderService.find(id);
        jpaCustomerRepository.delete(customer);
    }
}
