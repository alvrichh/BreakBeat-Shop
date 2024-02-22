package com.shop.breakbeat.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.breakbeat.dto.response.PexelsResponse;
import com.shop.breakbeat.dto.response.user.Perfil;
import com.shop.breakbeat.entities.Usuario;
import com.shop.breakbeat.service.impl.PexelsWebClient;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/resources")
@RequiredArgsConstructor
@CrossOrigin // Esto permite el acceso CORS de cualquier origen a todos los endpoints en este controlador
public class AuthorizationController {
	private static final Logger logger = LoggerFactory.getLogger(AuthorizationController.class);

	
	@Autowired
	PexelsWebClient pexelwebclient;
	
    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> sayHello() {
    	logger.info("## AuthorizationController :: sayHello" );
        return ResponseEntity.ok("Here is your resource");
    }
    
    @GetMapping("/perfil")
    public ResponseEntity<Perfil> miPerfil(@AuthenticationPrincipal Usuario usuario) {
    	logger.info("## AuthorizationController :: miPerfil" );
    	
    	Perfil userResponse = new Perfil(usuario.getFirstName(), usuario.getLastName(),usuario.getUsername(), usuario.getEmail(), usuario.getRoles().toString());
    	
    	return  ResponseEntity.ok(userResponse);
    }
    @CrossOrigin
    @GetMapping("/buscarfoto")
    public  ResponseEntity<PexelsResponse> buscarFotos(@RequestParam String query) {
        logger.info("## AuthorizationController :: buscar-foto(query: {}) ", query);
        
        PexelsResponse response = pexelwebclient.buscarImagenes(query).block(); // Bloquea hasta que Mono complete
        return ResponseEntity.ok(response);
    }
    
    

}
