package com.shop.breakbeat.entities;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Representa a un usuario en el sistema.
 */
@Table(name = "usuarios")
@Entity
public class Usuario implements UserDetails {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre no puede estar en blanco")
    private String firstName;

    @NotBlank(message = "El apellido no puede estar en blanco")
    private String lastName;

    @NotBlank(message = "El nombre de usuario no puede estar en blanco")
    @Size(min = 3, max = 20, message = "El nombre de usuario debe tener entre 3 y 20 caracteres")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "El correo electrónico no puede estar en blanco")
    @Email(message = "El formato del correo electrónico no es válido")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "La contraseña no puede estar en blanco")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

    @ElementCollection(fetch = FetchType.EAGER, targetClass = Role.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "usuario_rol")
    @Column(name = "RolesUsuario")
    private Set<Role> roles = new HashSet<>();

    /**
     * Devuelve una colección de roles asignados al usuario.
     *
     * @return Colección de roles.
     */
    @Transactional
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Cargar la colección de roles de manera temprana
        roles.size(); // Esto carga la colección de roles

        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }

    /**
     * Obtiene el nombre de usuario del usuario.
     *
     * @return Nombre de usuario.
     */
    @Override
    public String getUsername() {
        return username;
    }

    /**
     * Indica si la cuenta del usuario no ha expirado.
     *
     * @return Si la cuenta no ha expirado.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indica si la cuenta del usuario no está bloqueada.
     *
     * @return Si la cuenta no está bloqueada.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indica si las credenciales del usuario no han expirado.
     *
     * @return Si las credenciales no han expirado.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indica si el usuario está habilitado.
     *
     * @return Si el usuario está habilitado.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

    /**
     * Obtiene la contraseña del usuario.
     *
     * @return Contraseña del usuario.
     */
    @Override
    public String getPassword() {
        return password;
    }

    // Métodos setter añadidos
    // ...

    /**
     * Obtiene el ID del usuario.
     *
     * @return ID del usuario.
     */
    public Long getId() {
        return id;
    }

    /**
     * Obtiene el primer nombre del usuario.
     *
     * @return Primer nombre del usuario.
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Obtiene el apellido del usuario.
     *
     * @return Apellido del usuario.
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Obtiene el correo electrónico del usuario.
     *
     * @return Correo electrónico del usuario.
     */
    public String getEmail() {
        return email;
    }


    // Métodos setter añadidos
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
	public void setUsername(String username) {
		this.username = username;
	}
    
    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    
}






