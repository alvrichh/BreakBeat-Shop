package com.shop.breakbeat.service.user.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.shop.breakbeat.dto.response.user.Perfil;
import com.shop.breakbeat.repository.UsuarioRepository;
import com.shop.breakbeat.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UsuarioService {
	@Autowired
    private UsuarioRepository userRepository;
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return (UserDetails) userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }
	@Override
	public List<Perfil> getAllUsers() {
		List<Perfil> allUsers =  userRepository.findAll().stream()
			    .map(usuario -> new Perfil(usuario.getFirstName(), usuario.getLastName(), usuario.getEmail(), usuario.getUsername(), usuario.getRoles().toString()))
			    .collect(Collectors.toList());
		 return allUsers;
	}
}
