package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
import com.examly.springapp.model.User;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    public Optional<User> findByEmail(String email);
    public Optional<User> findByUsername(String username);


}
