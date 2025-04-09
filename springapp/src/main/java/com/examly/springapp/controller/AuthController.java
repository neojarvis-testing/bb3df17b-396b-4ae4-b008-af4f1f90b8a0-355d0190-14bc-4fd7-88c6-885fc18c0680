package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        return ResponseEntity.status(201).body(userService.createUser(user));
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        return ResponseEntity.status(200).body(userService.loginUser(user));
    }

}
