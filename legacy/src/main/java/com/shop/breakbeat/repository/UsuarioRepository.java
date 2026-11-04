package com.shop.breakbeat.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.breakbeat.entities.Usuario;

/**
 * Repositorio JPA para operaciones relacionadas con la entidad Usuario en la base de datos.
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Busca un usuario por su dirección de correo electrónico.
     *
     * @param email La dirección de correo electrónico del usuario.
     * @return Un Optional que contiene el usuario encontrado o es vacío si no se encuentra.
     */
    Optional<Usuario> findByEmail(String email);

    /**
     * Busca un usuario por su nombre de usuario.
     *
     * @param username El nombre de usuario del usuario.
     * @return Un Optional que contiene el usuario encontrado o es vacío si no se encuentra.
     */
    Optional<Usuario> findByUsername(String username);

    /**
     * Verifica si existe un usuario con la dirección de correo electrónico dada.
     *
     * @param email La dirección de correo electrónico a verificar.
     * @return `true` si existe un usuario con la dirección de correo electrónico dada, `false` en caso contrario.
     */
    Boolean existsByEmail(String email);

}
