package org.gym.service.customer;

import lombok.RequiredArgsConstructor;
import org.gym.exception.customer.CustomerAlreadyExistsException;
import org.gym.model.customer.Customer;
import org.gym.repository.customer.JpaCustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerCreatorService {

    private final JpaCustomerRepository jpaCustomerRepository;

    //Permite rollback si el proceso falla en algun lado
@Transactional
    public Customer create(Customer customer){
//sí hay un usuario con este DNI, exception
    if(jpaCustomerRepository.existsByDni(customer.getDni())){
        throw new CustomerAlreadyExistsException(customer.getDni());
    }
        return  jpaCustomerRepository.save(customer);
    }
}
