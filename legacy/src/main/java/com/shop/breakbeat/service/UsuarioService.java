package com.shop.breakbeat.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.shop.breakbeat.dto.response.user.UsuarioDTO;
import com.shop.breakbeat.entities.Usuario;

/**
 * Interfaz que define operaciones relacionadas con usuarios en el sistema.
 */
public interface UsuarioService {
    
    /**
     * Obtiene un servicio de detalles de usuario para la autenticación.
     *
     * @return Un servicio de detalles de usuario.
     */
    UserDetailsService userDetailsService();
    
    /**
     * Obtiene una lista de todos los usuarios en el sistema.
     *
     * @return Lista de objetos UsuarioDTO que representan a todos los usuarios.
     */
    List<UsuarioDTO> getAllUsers();
    
    /**
     * Obtiene un usuario por su ID.
     *
     * @param userId El ID del usuario a buscar.
     * @return Lista de usuarios encontrados (puede contener uno o ningún usuario).
     */
    List<Usuario> getUserById(Long userId);
}
