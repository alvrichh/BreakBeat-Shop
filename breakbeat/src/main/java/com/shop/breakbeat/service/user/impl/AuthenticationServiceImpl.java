package com.shop.breakbeat.service.user.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shop.breakbeat.dto.request.SignUpRequest;
import com.shop.breakbeat.dto.request.SigninRequest;
import com.shop.breakbeat.dto.response.user.JwtAuthenticationResponse;
import com.shop.breakbeat.entities.Role;
import com.shop.breakbeat.entities.Usuario;
import com.shop.breakbeat.repository.UsuarioRepository;
import com.shop.breakbeat.service.user.AuthenticationService;
import com.shop.breakbeat.service.user.JwtService;

import lombok.Builder;

/**
 * Implementación del servicio AuthenticationService para manejar operaciones de autenticación.
 */
@Builder
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private UsuarioRepository userRepository; // Asegúrate de que UserRepository esté inyectado correctamente
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Constructor para inyección de dependencias
    public AuthenticationServiceImpl(UsuarioRepository userRepository,
                                     PasswordEncoder passwordEncoder,
                                     JwtService jwtService,
                                     AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @param request Detalles de registro del usuario.
     * @return Respuesta de autenticación con el token JWT.
     * @throws IllegalArgumentException Si el correo electrónico ya está en uso.
     */
    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use.");
        }

        // Corrige la forma de construir el objeto 'User'
        Usuario user = new Usuario();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.getRoles().add(Role.ROLE_USER); // Asegúrate de que Role.USER esté definido correctamente
        userRepository.save(user);

        String jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    /**
     * Inicia sesión de un usuario existente en el sistema.
     *
     * @param request Detalles de inicio de sesión del usuario.
     * @return Respuesta de autenticación con el token JWT.
     * @throws IllegalArgumentException Si el nombre de usuario o la contraseña son inválidos.
     */
    @Override
    public JwtAuthenticationResponse signin(SigninRequest request) {
        Usuario user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        String jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }
}
