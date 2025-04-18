package com.examly.springapp.service;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Review;
import com.examly.springapp.repository.ReviewRepo;


import java.time.LocalDate;
import java.util.*;

@Service
public class ReviewServiceImpl implements ReviewService{

    private ReviewRepo reviewRepo;

    public ReviewServiceImpl(ReviewRepo reviewRepo){
        this.reviewRepo = reviewRepo;
    }
    
    public Review addReview(Review review){        
        review.setDate(LocalDate.now());
        return reviewRepo.save(review);
    }
    
    public Optional<Review> getReviewById(Long reviewId){
        Optional<Review> review = reviewRepo.findById(reviewId);
        if(review.isPresent()){
            return review; 
            //this optiona not object
        }
        else{
            return Optional.empty();
        }
    } 

    public List<Review> getAllReviews(){
        return reviewRepo.findAll();
    }
    public List<Review> getReviewsByUserId(Long userId){
        return reviewRepo.findByUserId(userId);
    }

    @Override
    public List<Review> getReviewsByProductid(Long productId) {
        return reviewRepo.findByProductId(productId);
    }

    @Override
    public boolean deleteReview(Long reviewId) {
        if(reviewRepo.existsById(reviewId)){
            reviewRepo.deleteById(reviewId);
            return true;
        }
        else{
            return false;
        }
    }

    






    

    
}



    