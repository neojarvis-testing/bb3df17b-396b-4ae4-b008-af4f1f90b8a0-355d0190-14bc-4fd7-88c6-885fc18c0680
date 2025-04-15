package com.examly.springapp.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exceptions.InvalidCredentialsException;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService{

    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public User createUser(User user) {
        Optional<User> opt = userRepo.findByEmail(user.getEmail());
        if(opt.isPresent()) {
            throw new UserAlreadyExistsException("User with Email Already Exists");
        }
        // Optional<User> opt2 = userRepo.findByUsername(user.getUsername());
        // if(opt2.isPresent()) {
        //     throw new UserAlreadyExistsException("User with Username Already Exists");
        // }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);

    }

    @Override
    public User getUserById(Long id) {
        Optional<User> opt = userRepo.findById(id);
        if(opt.isEmpty()) {
            throw new EntityNotFoundException();
        }
        return opt.get();
    }


@Override
public User loginUser(User user) {
    Optional<User> userOpt = userRepo.findByEmail(user.getEmail());
    User existingUser = userOpt.orElseThrow(() -> new InvalidCredentialsException("Invalid Email or Password"));
    System.out.println("Stored Encoded Password: " + existingUser.getPassword()); // Log the stored encoded password
    if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
        return existingUser;
    }
    throw new InvalidCredentialsException("Invalid Email or Password");
}

@Override
public User getUserByEmail(String email) {
    Optional<User> opt = userRepo.findByEmail(email);
        if(opt.isEmpty()) {
            throw new EntityNotFoundException();
        }
        return opt.get();
    
}


}