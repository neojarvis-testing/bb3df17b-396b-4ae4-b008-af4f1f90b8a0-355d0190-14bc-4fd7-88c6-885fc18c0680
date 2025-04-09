package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import com.examly.springapp.model.User;

public interface UserRepo extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);


}
