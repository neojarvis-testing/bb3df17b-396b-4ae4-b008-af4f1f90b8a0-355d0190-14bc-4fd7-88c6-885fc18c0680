package com.examly.springapp.controller;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Review;
import com.examly.springapp.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @PostMapping()
    public ResponseEntity<?> addReview(@RequestBody Review review){
        Review savedReview = reviewService.addReview(review);
        return ResponseEntity.status(200).body(savedReview);
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<?> getReviewById(@PathVariable Long reviewId){
        Optional<Review> optReview = reviewService.getReviewById(reviewId);
        if(optReview.isPresent()){
            return ResponseEntity.status(200).body(optReview.get());
        }
        else{
            return ResponseEntity.status(400).body("failed to add");
        }
    }
    
    @GetMapping()
    public ResponseEntity<?> getAllReviews(){
        List<Review> reviews  = reviewService.getAllReviews();
        return ResponseEntity.status(200).body(reviews);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getReviewsByUserId(@PathVariable Long userId){
        List<Review> reviews = reviewService.getReviewsByUserId(userId);
        return ResponseEntity.status(200).body(reviews);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getReviewsByProductid(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewsByProductid(productId);
        reviews.forEach(r -> System.out.println(r)); // Log reviews for debugging
        return ResponseEntity.status(200).body(reviews);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId){
        boolean flag = reviewService.deleteReview(reviewId);
        return ResponseEntity.status(200).body(flag);
    }

}