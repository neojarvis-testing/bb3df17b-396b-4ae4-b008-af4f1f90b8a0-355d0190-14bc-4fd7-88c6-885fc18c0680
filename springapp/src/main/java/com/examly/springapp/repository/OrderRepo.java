package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Order;

public interface OrderRepo extends JpaRepository<Order , Long> {

    public List<Order> findByUserUserId(Long userId);

}
