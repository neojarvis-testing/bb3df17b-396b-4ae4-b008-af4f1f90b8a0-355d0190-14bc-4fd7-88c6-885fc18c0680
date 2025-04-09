package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User loginUser(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loginUser'");
    }

}
