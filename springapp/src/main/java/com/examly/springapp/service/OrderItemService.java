package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.OrderItem;


public interface OrderItemService {
    public List<OrderItem> getOrderItemsByOrderId(Long orderId);
}
