package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.OrderItem;
import com.examly.springapp.service.OrderItemService;

import jakarta.persistence.EntityNotFoundException;

@RestController
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping("/api/order-items/{orderId}")
    public ResponseEntity<?> getOrderItemsByOrderId(@PathVariable Long orderId) {
        try {
            // Fetch the list of OrderItems for the given OrderId
            List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(orderId);

            // Check if the list is empty
            if (orderItems == null || orderItems.isEmpty()) {
                return ResponseEntity.status(404).body("No items found for order with ID: " + orderId);
            }

            // Return the list of OrderItems
            return ResponseEntity.status(200).body(orderItems);
        } catch (EntityNotFoundException e) {
            // If the order does not exist, return an error message
            return ResponseEntity.status(404).body("Order not found: " + e.getMessage());
        } catch (Exception e) {
            // Handle unexpected errors and return an appropriate response
            return ResponseEntity.status(500).body("An error occurred while fetching order items: " + e.getMessage());
        }
    }
}
