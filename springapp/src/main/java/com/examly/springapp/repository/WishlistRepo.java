package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.User;
import com.examly.springapp.model.Wishlist;

@Repository
public interface WishlistRepo extends JpaRepository<Wishlist,Long>{

    public Optional<Wishlist> findByUserUserId(Long userId);
    public Optional<Wishlist> findByUser(User user);
    
}
