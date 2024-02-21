package com.shop.breakbeat.config;

import java.util.Collections;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;
import com.shop.breakbeat.entities.*;
import com.shop.breakbeat.repository.ProductoRepository;
import com.shop.breakbeat.repository.UsuarioRepository;

@Profile("demo")
@Component
public class InitializationData implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public void run(String... args) throws Exception {


        try {
            // Usuario 1 - Rol USER
            Usuario usuario1 = new Usuario();
            usuario1.setFirstName("Alice");
            usuario1.setLastName("Johnson");
            usuario1.setUsername("@alicia23");
            usuario1.setEmail("alice.johnson@example.com");
            usuario1.setPassword(("password123"));
            usuario1.setRoles(Collections.singletonList(Role.ROLE_USER));  // Usamos Collections.singletonList para crear una lista con un solo elemento
            usuarioRepository.save(usuario1);
            System.out.println("Usuario ROLE_USER creado exitosamente");
        } catch (Exception e) {
            System.out.println("Error al crear usuario ROLE_USER");
            e.printStackTrace();  // O cualquier otra lógica de manejo de excepciones que desees
        }

        Faker faker = new Faker(new Locale("es"));
        for (int i = 0; i < 10; i++) { // Generar 10 productos ficticios
            Producto camiseta = new Producto();
            camiseta.setNombre(faker.dragonBall().character());
            productoRepository.save(camiseta);
        }
        
        // También puedes agregar aquí la creación del usuario ADMIN con ROLE_ADMIN si es necesario
        try {
            // Usuario 2 - Rol ADMIN
            Usuario adminUser = new Usuario();
            adminUser.setFirstName("Admin");
            adminUser.setLastName("User");
            adminUser.setUsername("@admin");
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword(("admin123"));
            adminUser.setRoles(Collections.singletonList(Role.ROLE_ADMIN));
            usuarioRepository.save(adminUser);
            System.out.println("Usuario ROLE_ADMIN creado exitosamente");
        } catch (Exception e) {
            System.out.println("Error al crear usuario ROLE_ADMIN");
            e.printStackTrace();  // O cualquier otra lógica de manejo de excepciones que desees
        }
    }
}
