package org.gym.controller.user;

import org.gym.dto.response.user.UserResponse;
import org.gym.model.user.User;
import org.gym.service.user.UserSearcherService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UsersGetController {

    private final UserSearcherService userSearcherService;

    public UsersGetController(UserSearcherService userSearcherService){
        this.userSearcherService = userSearcherService;
    }

    @GetMapping
    public ResponseEntity<Page<UserResponse>> search(
            @RequestParam ( defaultValue = "0" ) int page,
            @RequestParam ( defaultValue = "10" ) int size
    ){
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userSearcherService.findAll(pageable);

        return ResponseEntity.ok(
                users.map( user -> UserResponse.fromEntity(user) )
        );
    }
}
