package org.gym.dto.response.auth;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GoogleUserDto {
    private String email;
    private String username;

}
