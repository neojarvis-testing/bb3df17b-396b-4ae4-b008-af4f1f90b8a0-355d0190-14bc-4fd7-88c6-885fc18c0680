package com.examly.springapp.controller;

import java.util.Optional;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Review;
import com.examly.springapp.service.ReviewServiceImpl;

@RestController
public class ReviewController {
    @Autowired
    private ReviewServiceImpl reviewService;

    @PostMapping("api/reviews")
    public ResponseEntity<?> addReview(@RequestBody Review review){
    Review savedReview = reviewService.addReview(review);
    return ResponseEntity.status(0).body(savedReview);
    }

    @GetMapping("/api/reviews/{reviewId}")
    public ResponseEntity<?> getReviewById(@PathVariable Long reviewId){
        Optional<Review> optReview = reviewService.getReviewById(reviewId);
        if(optReview.isPresent()){
            return ResponseEntity.status(200).body(optReview.get());
        }
        else{
            return ResponseEntity.status(400).body("failed to add");
        }
        
    }
    
    @GetMapping("/api/reviews")
    public ResponseEntity<?> getAllReviews(){
        List<Review> reviews  = reviewService.getAllReviews();
        return ResponseEntity.status(200).body(reviews);
    }

    @GetMapping("/api/reviews/user/{userId}")
    public ResponseEntity<?> getReviewsByUserId(@PathVariable Long userId){
        List<Review> reviews = reviewService.getReviewsByUserId(userId);
        return ResponseEntity.status(200).body(reviews);
    }

    @GetMapping("/api/reviews/product/{productId}")
    public ResponseEntity<?> getReviewsByProductid(@PathVariable Long productId){
        List<Review> reviews = reviewService.getReviewsByProductid(productId);
        return ResponseEntity.status(200).body(reviews);
    }

    @DeleteMapping("/api/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId){
        boolean flag = reviewService.deleteReview(reviewId);
        return ResponseEntity.status(200).body(flag);
    }

}




