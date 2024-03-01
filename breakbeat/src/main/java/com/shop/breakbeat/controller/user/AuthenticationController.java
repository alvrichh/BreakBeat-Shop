package com.shop.breakbeat.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shop.breakbeat.dto.request.SignUpRequest;
import com.shop.breakbeat.dto.request.SigninRequest;
import com.shop.breakbeat.dto.response.user.JwtAuthenticationResponse;
import com.shop.breakbeat.service.user.AuthenticationService;

import lombok.RequiredArgsConstructor;

/**
 * Controlador para gestionar las operaciones de autenticación de usuarios.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin // Permite el acceso CORS de cualquier origen a todos los endpoints en este controlador
public class AuthenticationController {

    @Autowired
    private final AuthenticationService authenticationService;

    /**
     * Registra un nuevo usuario.
     *
     * @param request Datos de registro del usuario.
     * @return ResponseEntity con la respuesta de autenticación JWT.
     */
    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody SignUpRequest request) {
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    /**
     * Inicia sesión con credenciales de usuario.
     *
     * @param request Datos de inicio de sesión.
     * @return ResponseEntity con la respuesta de autenticación JWT.
     */
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest request) {
        return ResponseEntity.ok(authenticationService.signin(request));
    }
}
