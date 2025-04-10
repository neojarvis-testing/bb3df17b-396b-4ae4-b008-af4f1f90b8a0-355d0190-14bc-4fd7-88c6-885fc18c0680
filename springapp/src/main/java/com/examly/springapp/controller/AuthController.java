package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exceptions.InvalidCredentialsException;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.AuthUser;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
        return ResponseEntity.status(201).body(userService.createUser(user));
        } catch(UserAlreadyExistsException e) {
        return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO u){
        try{    
                AuthUser loginUser = userService.loginUser(u);
                return ResponseEntity.status(200).body(loginUser);
 
        }catch(InvalidCredentialsException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
       
    }

}
