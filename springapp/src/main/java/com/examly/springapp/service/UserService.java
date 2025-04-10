package com.examly.springapp.service;

import org.springframework.http.ResponseEntity;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;

public interface UserService {

    public User createUser(User user);
    public ResponseEntity<?> loginUser(LoginDTO request);

}
