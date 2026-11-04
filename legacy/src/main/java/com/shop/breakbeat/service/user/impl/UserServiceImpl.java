package com.shop.breakbeat.service.user.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.shop.breakbeat.dto.response.user.UsuarioDTO;
import com.shop.breakbeat.entities.Usuario;
import com.shop.breakbeat.repository.UsuarioRepository;
import com.shop.breakbeat.service.UsuarioService;

import lombok.RequiredArgsConstructor;

/**
 * Implementación del servicio de usuarios que extiende la interfaz UsuarioService.
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository userRepository;

    /**
     * Implementación del servicio UserDetailsService que carga un usuario por su nombre de usuario.
     *
     * @return Detalles del usuario.
     * @throws UsernameNotFoundException Si el usuario no es encontrado.
     */
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return (UserDetails) userRepository.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    /**
     * Obtiene todos los usuarios y los convierte en una lista de UsuarioDTO.
     *
     * @return Lista de UsuarioDTO.
     */
    @Override
    public List<UsuarioDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(usuario -> new UsuarioDTO(usuario.getFirstName(), usuario.getLastName(), usuario.getEmail(), usuario.getUsername(), usuario.getRoles().toString()))
                .collect(Collectors.toList());
    }

    /**
     * Obtiene un usuario por su ID.
     *
     * @param userId ID del usuario a obtener.
     * @return Lista que contiene el usuario si se encuentra, o una lista vacía si no.
     */
    @Override
    public List<Usuario> getUserById(Long userId) {
        // Se asume que hay un método en el repositorio que retorna un Optional<Usuario>
        Optional<Usuario> optionalUser = userRepository.findById(userId);

        // Verifica si el usuario existe y retorna una lista con ese usuario o una lista vacía si no se encuentra
        return optionalUser.map(List::of).orElse(List.of());
    }
}
