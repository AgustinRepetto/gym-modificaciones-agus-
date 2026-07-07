package org.gym.exception.customer;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class CustomerAlreadyExistsException extends RuntimeException {
    public CustomerAlreadyExistsException(String dni) {

        super("The customer with DNI " + dni + " already exists in the system.");
    }
}
