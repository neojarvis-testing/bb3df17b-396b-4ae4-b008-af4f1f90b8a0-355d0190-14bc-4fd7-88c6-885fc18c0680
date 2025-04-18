package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.EmailService;
import com.examly.springapp.service.OTPService;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/otp")
public class OTPController {

    private OTPService otpService;
    private EmailService emailService;

    public OTPController(OTPService otpService, EmailService emailService){
        this.otpService = otpService;
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public String sendOtp(@RequestParam String email) {
        String decodedEmail = URLDecoder.decode(email, StandardCharsets.UTF_8);
        String otp = otpService.generateOTP(decodedEmail);
        emailService.sendOTPEmail(decodedEmail, otp);
        return "OTP sent to email!";
    }

    @PostMapping("/verify")
    public boolean verifyOtp(@RequestParam String email, @RequestParam String otp) {
        boolean isValid = otpService.verifyOTP(email, otp);
        if (isValid) otpService.clearOTP(email);
        return isValid;
    }
}
