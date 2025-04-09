package com.examly.springapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/register", "/api/login").permitAll()
                // .requestMatchers("/api/user/**").hasRole("ADMIN")
                .anyRequest().permitAll()
            )
            .httpBasic();
        return http.build();
    }
    
    // @Autowired
    // private AuthenticationProvider authenticationProvider;

    // @Autowired
    // private JwtAuthenticationFilter jwtAuthenticationFilter;

    // private static final String[] WHITELIST = {
    //     "**"    
    // };

    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    //     return httpSecurity.csrf(AbstractHttpConfigurer::disable)
    //             .cors().and()
    //             .authorizeHttpRequests(auth -> auth
    //                     .requestMatchers(WHITELIST).permitAll()
    //                     .anyRequest().authenticated())
    //             .authenticationProvider(authenticationProvider)
    //             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    //             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
    //             .build();
    // }
}
