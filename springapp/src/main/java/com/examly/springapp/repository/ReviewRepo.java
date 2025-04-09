package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Review;
import java.util.*;


public interface ReviewRepo extends JpaRepository<Review,Long> {
    @Query("SELECT r FROM Review r WHERE r.user.id =:userId")
    List<Review> findByUserId(Long userId); 


    @Query("SELECT r FROM Review r WHERE r.product.id =:productId")
    List<Review> findByProductId(Long productId);
    //we have to update jpql query after adding user and product repo
}
