package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long reviewId;
    private String reviewText;
    private int rating;
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name="userId")
    private User user;
    @ManyToOne
    @JoinColumn(name="productId")
    private Product product;

    
    public Review() {
    }

    public Review(Long reviewid, String reviewText, int rating, LocalDate date, User user, Product product) {
        this.reviewId = reviewid;
        this.reviewText = reviewText;
        this.rating = rating;
        this.date = date;
        this.user = user;
        this.product = product;
    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "Review [reviewId=" + reviewId + ", reviewText=" + reviewText + ", rating=" + rating + ", date=" + date
                + ", user=" + user + ", product=" + product + "]";
    }

    
    
}