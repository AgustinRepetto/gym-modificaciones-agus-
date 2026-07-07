package org.gym.repository.customer;

import org.gym.model.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaCustomerRepository extends JpaRepository <Customer, Long>, JpaSpecificationExecutor<Customer> {

    boolean existsByDni(String dni);

    Page<Customer> findByIdOrDniContaining(
            Long id, String dni, Pageable pageable);
    Page<Customer> findByFullNameContainingIgnoreCase(
            String fullName, Pageable pageable);
}
