package com.shop.breakbeat.config;

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
    
    private final boolean borrarProductos = false; // Variable para controlar el borrado de datos
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Override
    public void run(String... args) throws Exception {
    	
    	if (borrarProductos) {
    		productoRepository.deleteAll(); // Borra todos las camisetas existentes
        }
    	
    	try {
    		// Usuario 1 - Rol USER
            Usuario usuario1 = new Usuario();
            usuario1.setFirstName("Alice");
            usuario1.setLastName("Johnson");
            usuario1.setUsername("@alicia23");
            usuario1.setEmail("alice.johnson@example.com");
            usuario1.setPassword(("password123"));
            usuarioRepository.save(usuario1);

}catch(Exception e) {
    		
    	}
    	Faker faker = new Faker(new Locale("es"));
        for (int i = 0; i < 10; i++) { // Generar 10  ficticios
            Producto camiseta = new Producto();
            camiseta.setNombre(faker.dragonBall().character());
            productoRepository.save(camiseta);
        }
        
    }
}