package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

@RestController
@CrossOrigin(allowedHeaders = "*",origins = "*")
public class AuthController {
 
    @Autowired
    private UserService userService;
 
    @Autowired
    private JwtUtils jwtUtils;
 
   
    @PostMapping("/api/register")
        public ResponseEntity<User> registerUser(@RequestBody User user) {
            try {
                User newUser = userService.createUser(user);
               return new ResponseEntity<>(newUser, HttpStatus.CREATED);
            } catch (RuntimeException e) {
               return new ResponseEntity<>(null, HttpStatus.CONFLICT);
           }
       
        }
 
 
   //  @PostMapping("/api/login")
   //    public ResponseEntity<LoginDTO> loginUser(@RequestBody User user) {
   //       try {
   //          User loggedInUser = userService.loginUser(user);
   //          String token = jwtUtils.generateToken(loggedInUser.getEmail()); // Generate the JWT token
 
   //          // Create and populate LoginDTO
   //          LoginDTO loginDTO = new LoginDTO();
   //          loginDTO.setToken(token);
   //          loginDTO.setEmail(loggedInUser.getEmail());
   //          loginDTO.setRole(loggedInUser.getUserRole());
   //          loginDTO.setUserId(loggedInUser.getUserId().intValue());
 
   //          return new ResponseEntity<>(loginDTO, HttpStatus.OK);
   //       } catch (RuntimeException e) {
   //          return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
   //       }
   //    }

   
@PostMapping("/api/login")
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

   }
