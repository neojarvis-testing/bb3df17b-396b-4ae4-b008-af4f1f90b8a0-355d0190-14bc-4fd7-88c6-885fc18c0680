package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Order;

public interface OrderService {

    public Order addOrder(Order order);
    public Optional<Order> getOrderById(Long orderId);
    public List<Order> getAllOrders();
    public Optional<Order> updateOrder(Long orderId , Order updatedOrder);
    public List<Order> getOrdersByUserId(Long userId);
    public boolean deleteOrder(Long orderId);


}
