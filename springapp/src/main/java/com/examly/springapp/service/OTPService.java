package com.examly.springapp.service;

import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class OTPService {

    private final Map<String, String> otpStorage = new HashMap<>();

    public String generateOTP(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        // System.out.println("++++++++++++++++++++++++++");
        // System.out.println(otp);
        otpStorage.put(email, otp);
        // System.out.println("from generate");
        // System.out.println(otpStorage);
        return otp;
    }

    public boolean verifyOTP(String email, String otp) {
         String decodedEmail = URLDecoder.decode(email, StandardCharsets.UTF_8);
        // return otp.equals(otpStorage.get(otp));
        return otp.equals(otpStorage.get(decodedEmail));
    }

    public void clearOTP(String email) {
        otpStorage.remove(email);
    }
}