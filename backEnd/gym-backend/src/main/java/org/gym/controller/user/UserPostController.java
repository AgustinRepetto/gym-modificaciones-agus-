package org.gym.controller.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.gym.dto.request.user.UserRequest;
import org.gym.dto.response.user.UserResponse;
import org.gym.model.user.User;
import org.gym.service.user.UserCreatorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserPostController {

    private final UserCreatorService userCreatorService;

    @PostMapping
    public ResponseEntity<UserResponse> create(
            @Valid @RequestBody UserRequest userRequest
            ){
        User user = new User();
        user.setUsername( userRequest.getUsername() );
        user.setEmail( userRequest.getEmail() );
        user.setPassword( userRequest.getPassword() );

        User saved = this.userCreatorService.create(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.fromEntity(saved));
    }
}
