package com.shop.breakbeat.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.breakbeat.entities.Usuario;

public interface UsuarioRepository  extends JpaRepository<Usuario, Long> {
    // Since email is unique, we'll find users by email
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findById(Long id);
    Boolean existsByEmail(String email);
    
}