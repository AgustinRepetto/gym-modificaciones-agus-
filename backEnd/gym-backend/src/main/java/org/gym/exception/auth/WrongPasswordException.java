package org.gym.exception.auth;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class WrongPasswordException extends RuntimeException {

    public WrongPasswordException() {
        super("Wrong password");
    }

    // Constructor con parámetro: por si alguna vez se necesita personalizar
    //public WrongPasswordException(String message) { super(message); }
}
