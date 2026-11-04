package com.shop.breakbeat.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shop.breakbeat.controller.user.AuthenticationController;
import com.shop.breakbeat.dto.request.SignUpRequest;
import com.shop.breakbeat.dto.request.SigninRequest;
import com.shop.breakbeat.dto.response.user.JwtAuthenticationResponse;
import com.shop.breakbeat.service.user.AuthenticationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private AuthenticationController authenticationController;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void signupDeberiaRegistrarNuevoUsuario() throws Exception {
        // Configurar datos de prueba
        SignUpRequest signUpRequest = new SignUpRequest();
        signUpRequest.setUsername("testuser");
        signUpRequest.setEmail("testuser@example.com");
        signUpRequest.setPassword("testpassword");

        // Configurar comportamiento del servicio mock
        when(authenticationService.signup(any(SignUpRequest.class)))
                .thenReturn(new JwtAuthenticationResponse("jwt-token"));

        // Realizar la solicitud POST y verificar el resultado
        mockMvc.perform(post("/api/v1/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signUpRequest)))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.token").value("jwt-token"));
    }

    @Test
    void signinDeberiaIniciarSesionConCredenciales() throws Exception {
        // Configurar datos de prueba
        SigninRequest signinRequest = new SigninRequest();
        signinRequest.setUsername("testuser");
        signinRequest.setPassword("testpassword");

        // Configurar comportamiento del servicio mock
        when(authenticationService.signin(any(SigninRequest.class)))
                .thenReturn(new JwtAuthenticationResponse("jwt-token"));

        // Realizar la solicitud POST y verificar el resultado
        mockMvc.perform(post("/api/v1/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signinRequest)))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.token").value("jwt-token"));
    }
}
