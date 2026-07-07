package org.gym.exception;


import jakarta.servlet.http.HttpServletRequest;
import org.gym.dto.response.ErrorResponse;
import org.gym.exception.auth.WrongPasswordException;
import org.gym.exception.customer.CustomerAlreadyExistsException;
import org.gym.exception.customer.CustomerNotFoundException;
import org.gym.exception.news.NewsNotFoundException;
import org.gym.exception.payment.PaymentNotFoundException;
import org.gym.exception.user.UserEmailAlreadyExistsException;
import org.gym.exception.user.UserNotFoundByEmailException;
import org.gym.exception.user.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//intermediario global, y transforma los datos a tipo JSON
//en el futuro podría hacer una Exception padre y pasarle las demás excepciones de hijo
//El bloque crece y crece con cada entidad nueva, es mejor Heredarlas
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({UserEmailAlreadyExistsException.class,
    CustomerAlreadyExistsException.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleConflictExists(
            RuntimeException ex,
            HttpServletRequest request) {
                return buildErrorResponse(
                        HttpStatus.CONFLICT, ex.getMessage(), request);
    }

//para los NOT_FOUND
    @ExceptionHandler({
            UserNotFoundException.class,
            UserNotFoundByEmailException.class,
            CustomerNotFoundException.class,
            PaymentNotFoundException.class,
            NewsNotFoundException.class
    })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(
            RuntimeException ex,
            HttpServletRequest request
    ){
        return buildErrorResponse(
                HttpStatus.NOT_FOUND, ex.getMessage(), request
        );
    }

    @ExceptionHandler(WrongPasswordException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleWrongPassword(
            WrongPasswordException ex,
            HttpServletRequest request
    ){
        return buildErrorResponse(
                HttpStatus.UNAUTHORIZED, ex.getMessage(), request
        );
    }

    private ErrorResponse buildErrorResponse(
            HttpStatus status,
            String message,
            HttpServletRequest request
    ){
        //lo que muestra el JSON sin logica de excepcion
    return new ErrorResponse(
            status.value(),
            status.getReasonPhrase(),
            message,
            request.getRequestURI()
    );
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) // Cambiado a 500
    public ErrorResponse handleGenericException(
            Exception ex,
            HttpServletRequest request
    ){
        return buildErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal server error: " + ex.getMessage(), // Mensaje genérico real
                request
        );
    }
}
