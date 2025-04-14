package com.examly.springapp.service;

import java.io.ByteArrayInputStream;
import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Order;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOTPEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your OTP for Registration");
        message.setText("Your OTP is: " + otp);
        message.setFrom("prokartservices@gmail.com");
        mailSender.send(message);
    }

   public void sendOrderConfirmation(Order order) {
        try {
            byte[] pdfContent = PdfGeneratorUtil.generateInvoicePdf(order);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("prokartservices@gmail.com");
            helper.setTo(order.getUser().getEmail());
            helper.setSubject("Order Confirmation - #" + order.getOrderId());
            helper.setText("Dear " + order.getUser().getUsername() + ",\n\n"
                    + "Thank you for your order! Please find your invoice attached.\n\n"
                    + "Best regards,\nProKart");

            helper.addAttachment("Invoice_Order_" + order.getOrderId() + ".pdf", 
                () -> new ByteArrayInputStream(pdfContent));

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send order confirmation email: " + e.getMessage());
        }
    }
}