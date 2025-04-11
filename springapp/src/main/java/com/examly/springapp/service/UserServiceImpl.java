package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exceptions.InvalidCredentialsException;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

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

    // @Override
    // public User loginUser(User user) {
    // //     Authentication authentication = authenticationManager.authenticate(
    // //         new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
    // //         );
    // //     if(authentication.isAuthenticated()){
    // //     List<String> roleList=authentication.getAuthorities().stream().map(r->r.getAuthority()).collect(Collectors.toList());
    // //     if(roleList.isEmpty()){
    // //         throw new IllegalStateException("User has no role");
    // //     }
    // //     String role=roleList.get(0);
    // //     AuthUser authUser=new AuthUser();
    // //     authUser.setUserName(user.getEmail());
    // //     authUser.setToken(jwtUtils.generateToken(user.getEmail()));
    // //     authUser.setRole(role);
    // //     authUser.setUserId(userRepo.findByEmail(user.getEmail()).orElse(null).getUserId());
    // //     authUser.setName(userRepo.findByEmail(user.getEmail()).orElse(null).getUsername());
    // //     return authUser;
    // //    }
    // //    else{
    // //     throw new InvalidCredentialsException("Invalid User Name or Password");
    // //    }

    // Optional<User> userOpt = userRepo.findByEmail(user.getEmail());
    // User existingUser = userOpt.orElseThrow(() -> new RuntimeException("Invalid Email or Password"));
    // if(existingUser.getPassword().equals(user.getPassword())){
    //     return existingUser;
    // }
    // throw new RuntimeException("invalid Email or Password");
    // }

    
// @Override
// public User loginUsera(User user) {

//     Authentication authentication = authenticationManager.authenticate(
//     new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
//     if (authentication.isAuthenticated()) {
//         return userRepo.findByEmail(user.getEmail()).orElseThrow(() -> new InvalidCredentialsException("Invalid Email or Password"));
//     } else {
//         return null;
//         } 
//     }

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


}