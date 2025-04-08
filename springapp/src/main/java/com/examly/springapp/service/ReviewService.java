package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Review;


@Service
public interface ReviewService {
    Review addReview(Review review);
    Review getReviewid(Long reviewid);
    List<Review> Reviews();
    List<Review> getReviewsByUserId(Long userId);
    List<Review> getReviewsByProductid(Long productId);
    boolean deleteReview(Long reviewId);


}



