package com.shop.breakbeat.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.shop.breakbeat.dto.response.user.UsuarioDTO;

public interface UsuarioService {
    UserDetailsService userDetailsService();
    List<UsuarioDTO> getAllUsers();
}
