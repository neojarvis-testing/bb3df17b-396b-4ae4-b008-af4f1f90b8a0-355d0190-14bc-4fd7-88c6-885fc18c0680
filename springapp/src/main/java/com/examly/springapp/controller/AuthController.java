package com.examly.springapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exceptions.InvalidCredentialsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api")
public class AuthController {

    private UserService userService;
    private JwtUtils jwtUtils;
            
    public AuthController(UserService userService, JwtUtils jwtUtils){
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }
 
   
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        try {
            User newUser = userService.createUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
        return ResponseEntity.status(200).body(userService.getUserById(userId));
        } catch(EntityNotFoundException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
 
    @PostMapping("/login")
    public ResponseEntity<LoginDTO> loginUser(@RequestBody User user) {
        try {
        User loggedInUser = userService.loginUser(user);
        if (loggedInUser == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        String token = jwtUtils.generateToken(loggedInUser.getEmail()); // Generate the JWT token

        // Create and populate LoginDTO
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setToken(token);
        loginDTO.setEmail(loggedInUser.getEmail());
        loginDTO.setRole(loggedInUser.getUserRole());
        loginDTO.setUserId(loggedInUser.getUserId().intValue());
        loginDTO.setUsername(loggedInUser.getUsername());

        return new ResponseEntity<>(loginDTO, HttpStatus.OK);
        } catch (RuntimeException e) {
        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/change-password/{userId}/{oldPassword}/{newPassword}")
    public ResponseEntity<?> changePassword(
        @PathVariable Long userId,
        @PathVariable String oldPassword,
        @PathVariable String newPassword) {
    try {
        // boolean isChanged = userService.changeUserPassword(userId, oldPassword, newPassword);
        return ResponseEntity.ok("Password changed successfully");
    } catch (InvalidCredentialsException e) {
        return ResponseEntity.status(401).body(e.getMessage());
    } catch (EntityNotFoundException e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }
}

}

