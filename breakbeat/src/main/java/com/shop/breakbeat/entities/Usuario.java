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
import jakarta.transaction.Transactional;

@Entity
public class Usuario implements UserDetails{
	  private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellidos;
    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;
    private String password;

    @ElementCollection(fetch = FetchType.EAGER, targetClass = Rol.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name="usuario_rol")
    @Column(name ="RolesUsuario")
    private Set<Rol> roles = new HashSet<>();


    @Transactional
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Cargar la colección de roles de manera temprana
        roles.size(); // Esto carga la colección de roles

        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }
    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getPassword() {
        return password;
    }

    // Métodos setter añadidos
    public void setFirstName(String firstName) {
        this.nombre = firstName;
    }

    public void setLastName(String lastName) {
        this.apellidos = lastName;
    }
    
	public String setUsername(String username) {
		return username;
	}
    
    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Rol> getRoles() {
        return roles;
    }

    public void setRoles(Set<Rol> roles) {
        this.roles = roles;
    }
	public Long getId() {
		return id;
	}
	public String getFirstName() {
		return nombre;
	}
	public String getLastName() {
		return apellidos;
	}
	public String getEmail() {
		return email;
	}

    
}
