package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.WishlistItem;

@Repository
public interface WishlistItemRepo extends JpaRepository<WishlistItem,Long> {
    
}
