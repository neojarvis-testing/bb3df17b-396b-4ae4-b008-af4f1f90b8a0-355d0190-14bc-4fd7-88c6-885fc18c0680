package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;


import com.examly.springapp.model.Review;



public interface ReviewService {
   

    public Review addReview(Review review);
    public Optional<Review> getReviewById(Long reviewId);
    public List<Review> getAllReviews();
    public List<Review> getReviewsByUserId(Long userId);
    public List<Review> getReviewsByProductid(Long productId);
    public boolean deleteReview(Long reviewId);


}



