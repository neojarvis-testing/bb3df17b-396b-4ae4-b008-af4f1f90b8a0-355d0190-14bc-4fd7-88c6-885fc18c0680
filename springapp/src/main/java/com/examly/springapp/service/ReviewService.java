package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Review;



public interface ReviewService {
   

    Review addReview(Review review);
    Optional<Review> getReviewById(Long reviewId);
    List<Review> getAllReviews();
    List<Review> getReviewsByUserId(Long userId);
    List<Review> getReviewsByProductid(Long productId);
    boolean deleteReview(Long reviewId);


}



