package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Order;

public interface OrderService {


    public Order addOrder(Order order); // Adds a new order
    public Optional<Order> getOrderById(Long orderId); // Retrieves an order by ID
    public List<Order> getAllOrders(); // Retrieves all orders
    public Order updateOrder(Long orderId, Order updatedOrder); // Updates order details
    List<Order> getOrdersByUserId(Long userId); // Retrieves orders by user ID
    public boolean deleteOrder(Long orderId); // Deletes an order by ID

}




