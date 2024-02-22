package com.shop.breakbeat.controller.user;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.breakbeat.dto.response.user.Perfil;
import com.shop.breakbeat.service.UsuarioService;



@RestController
@RequestMapping("/api/v1/users")
public class AuthorizationAdminController {
	
	private static final Logger logger = LoggerFactory.getLogger(AuthorizationAdminController.class);

   @Autowired
	private UsuarioService userService;


    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Perfil>> showUsers() {
    	logger.info("## AuthorizationAdminController :: showUsers" );
        List<Perfil> userList = userService.getAllUsers();
        return ResponseEntity.ok(userList);
    }
}