package com.shop.breakbeat.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.shop.breakbeat.dto.UserDTO;

public interface UsuarioService {
    UserDetailsService userDetailsService();
    List<UserDTO> getAllUsers();
}
