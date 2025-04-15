package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderItem;
import com.examly.springapp.repository.OrderItemRepo;
import com.examly.springapp.repository.OrderRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderItemServiceImpl implements OrderItemService{

    private OrderItemRepo orderItemRepo;
    private OrderRepo orderRepo;

    public OrderItemServiceImpl(OrderItemRepo orderItemRepo, OrderRepo orderRepo){
        this.orderItemRepo = orderItemRepo;
        this.orderRepo = orderRepo;
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        Optional<Order> order = orderRepo.findById(orderId);
    if (order.isEmpty()) {
        throw new EntityNotFoundException("Order not found with ID: " + orderId);
    }

    // Fetch and return the OrderItems
    return orderItemRepo.findByOrderOrderId(orderId);
}

}
