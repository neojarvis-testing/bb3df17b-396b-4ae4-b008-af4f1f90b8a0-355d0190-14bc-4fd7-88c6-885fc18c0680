package com.examly.springapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService{

    // @Override
    // public User createUser(User user) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'createUser'");
    // }

    // @Override
    // public LoginDTO loginUser(User user) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'loginUser'");
    // }

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
        Optional<User> opt2 = userRepo.findByUsername(user.getUsername());
        if(opt2.isPresent()) {
            throw new UserAlreadyExistsException("User with Username Already Exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public ResponseEntity<?> loginUser(LoginDTO request) {

        Optional<User> opt = userRepo.findByEmail(request.getEmail());
        if(opt.isPresent() && opt.get().getPassword().equals(request.getPassword())) {
            LoginDTO response = new LoginDTO(
                opt.get().getEmail(),null,opt.get().getUserRole(),"123456781234567812345678123456781234567812345678"
            );
            return ResponseEntity.ok(response);
        }return ResponseEntity.status(401).body(null);
        
        // Authentication authentication = authenticationManager.authenticate(
        //     new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        // );
        // UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // LoginDTO dto = new LoginDTO();

        // dto.setToken(jwtUtils.generateToken(userDetails));
        // return dto;
    }

}
