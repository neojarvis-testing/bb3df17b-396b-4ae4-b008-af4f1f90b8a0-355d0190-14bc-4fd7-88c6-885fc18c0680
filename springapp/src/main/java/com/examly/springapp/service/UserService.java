package com.examly.springapp.service;

import com.examly.springapp.model.User;

public interface UserService {

    public User createUser(User user);
    public User loginUser(User user);

}
