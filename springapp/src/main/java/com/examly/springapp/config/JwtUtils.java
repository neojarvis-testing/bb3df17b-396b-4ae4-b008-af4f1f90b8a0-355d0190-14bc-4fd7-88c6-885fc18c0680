package com.examly.springapp.config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

    public static final String SECRET = "1234567812345678123456788765432187654321876543211234567887654321";


    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    
    }
    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }
    
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
      }
  
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignKey())
                  .build()
                  .parseClaimsJws(token)
                  .getBody();
    }

    private Key getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //generate the token
    public String generateToken(String email){
        Map<String,Object> claims = new HashMap<>();
        return createToken(claims,email);
    }
    public String createToken(Map<String,Object> claims,String email){

        return Jwts.builder()
        .setClaims(claims)
        .setSubject(email)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
        .signWith(getSignKey(), SignatureAlgorithm.HS256)
        .compact();
        
    }
    // validate the token
    public boolean validateToken(String token, UserDetails userDetails){
        final String email = extractUsername(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);

    }


}
