package com.examly.springapp.service;

import com.examly.springapp.model.User;

public interface UserService {

    public User createUser(User user);
    public User loginUser(User user);
    public User getUserById(Long id);
    public User getUserByEmail(String email);
    public boolean changeUserPassword(Long userId, String oldPassword, String newPassword);

}
