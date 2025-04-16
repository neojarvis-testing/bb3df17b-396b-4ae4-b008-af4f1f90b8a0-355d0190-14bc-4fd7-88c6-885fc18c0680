package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Cart;
import com.examly.springapp.model.User;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
    public Optional<Cart> findByUserUserId(Long userId);
    public Optional<Cart> findByUser(User user);
}
