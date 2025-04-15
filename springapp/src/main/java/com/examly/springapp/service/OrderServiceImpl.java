package com.examly.springapp.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.OrderNotFoundException;
import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderItem;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.OrderItemRepo;
import com.examly.springapp.repository.OrderRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderServiceImpl implements OrderService{

    private OrderRepo orderRepository;
    private UserRepo userRepo;
    private OrderItemRepo orderItemRepo;

    public OrderServiceImpl(OrderRepo orderRepository, UserRepo userRepo, OrderItemRepo orderItemRepo){
        this.orderItemRepo = orderItemRepo;
        this.orderRepository = orderRepository;
        this.userRepo = userRepo;
    }

    @Override
    public Order addOrder(Order order) {
        Order savedOrder = orderRepository.save(order);

    // Ensure each OrderItem is linked to the saved Order
    if (order.getOrderItems() != null) {
        for (OrderItem item : order.getOrderItems()) {
            item.setOrder(savedOrder); // Link the OrderItem to the saved Order
            item.setPrice(item.getProduct().getPrice() * item.getQuantity()); // Calculate price
        }
        orderItemRepo.saveAll(order.getOrderItems()); // Save all OrderItems
    }

    return savedOrder;// Returns the saved order
    }

    @Override
    public Optional<Order> getOrderById(Long orderId) {
    return orderRepository.findById(orderId);
}


    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // @Override
    // public Order updateOrder(Long orderId, Order updatedOrder) {
    //     updatedOrder.setOrderId(orderId);
    //     if(orderRepository.existsById(orderId)){
    //        Order savedOrder = orderRepository.save(updatedOrder);
    //        return savedOrder;
    //     }
    //     else{
    //         throw new OrderNotFoundException("Order Not Found");
    //     }

    // }

    public Order updateOrder(Long orderId, Order updatedOrder) {
        Optional<Order> existingOrder = orderRepository.findById(orderId);
        if (existingOrder.isPresent()) {
            Order order = existingOrder.get();
            order.setOrderStatus(updatedOrder.getOrderStatus()); // Update the status
            return orderRepository.save(order); // Persist the changes
        } else {
            throw new EntityNotFoundException("Order not found with ID: " + orderId);
        }
    }
    

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        Optional<User> user = userRepo.findById(userId);
        if (user.isEmpty()) {
            throw new OrderNotFoundException("User not found with ID: " + userId);
        }
        List<Order> orders = orderRepository.findByUser(user.get());
        if (orders.isEmpty()) {
            throw new OrderNotFoundException("No orders found for user with ID: " + userId);
        }
        return orders;
    }
    

    @Override
    public boolean deleteOrder(Long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            orderRepository.delete(order.get());
            return true;
        }
        return false;
    }

}
