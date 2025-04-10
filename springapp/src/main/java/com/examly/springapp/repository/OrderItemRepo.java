package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.OrderItem;

@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem,Long>{
    List<OrderItem> findByOrderOrderId(Long orderId);
}
