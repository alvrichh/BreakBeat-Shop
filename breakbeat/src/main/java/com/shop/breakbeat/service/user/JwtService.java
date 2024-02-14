package com.shop.breakbeat.service.user;

import org.springframework.security.core.userdetails.UserDetails;

import com.shop.breakbeat.model.Usuario;

public interface JwtService {
    String extractUserName(String token);
    String generateToken(Usuario user);
    boolean isTokenValid(String token, UserDetails userDetails);
}
