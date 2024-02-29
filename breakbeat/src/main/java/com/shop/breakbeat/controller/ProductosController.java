package com.shop.breakbeat.controller;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.breakbeat.entities.Camiseta;
import com.shop.breakbeat.entities.Producto;
import com.shop.breakbeat.service.ProductoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.persistence.EntityNotFoundException;

/** 
 * Nota 1: Es preferible mantener un solo idioma para el proyecto 
 * es discutible si se debería llamar BookController.java
 *  
 *       LibrosController.java 'llanito style ' 
 */ 

// (o yanito) a una variedad lingüística utilizada 
//  comúnmente por los habitantes de Gibraltar

	@RestController
	@RequestMapping("/api/v1/productos")
	public class ProductosController {

    	private static final Logger logger = LoggerFactory.getLogger(ProductosController.class);

	    @Autowired
	    private ProductoService productoService;

	    // Endpoint para obtener un listado de libros, accesible solo por ROLE_USER
	    @GetMapping
	    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
	    public ResponseEntity<Page<Producto>> listarTodosLosProductos(
	            @RequestParam(required = false, defaultValue = "0") int page,
	            @RequestParam(required = false, defaultValue = "10") int size) {
	        
	        logger.info("ProductosController :: listarTodosLosProductos");
	        Pageable pageable = PageRequest.of(page, size);
	        Page<Producto> productos = productoService.listarTodosLosProductos(pageable);
	        return new ResponseEntity<>(productos, HttpStatus.OK);
	    }
	    
	    @GetMapping("/{id}")
	    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
	    public ResponseEntity<?> getProductById(@PathVariable Long id) {
	        Producto producto = productoService.obtenerProductoPorId(id);

	        if (producto != null) {
	            return ResponseEntity.ok(producto);
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado.");
	        }
	    }

	    // CRUD endpoints, accesibles solo por ROLE_ADMIN
	    // Crear un nuevo producto
	    @PostMapping
	    //@PreAuthorize("hasRole('ROLE_ADMIN')")
	    @Operation(summary = "Crear un nuevo jabón", description = "Crea un nuevo jabón y lo guarda en la base de datos")
	    @ApiResponse(responseCode = "201", description = "Jabón creado con éxito")
	    @ApiResponse(responseCode = "400", description = "Datos proporcionados para el nuevo jabón son inválidos")
	    public ResponseEntity<Producto> createProduct(@RequestBody Producto nuevoProducto) {
	    	logger.info("## crearProducto ##");

	        // Guarda el nuevo Producto en la base de datos
	        Producto productoCreado = productoService.agregarProducto(nuevoProducto);

	        // Devuelve una respuesta con el jabón creado y el código de estado 201 (CREATED)
	        return ResponseEntity.status(HttpStatus.CREATED).body(productoCreado);
	    }

	    // Actualizar un producto
	    @PutMapping("/{id}")
	    @PreAuthorize("hasRole('ROLE_ADMIN')")
	    public Producto updateProduct(@PathVariable Long id, @RequestBody Producto productDetails) {
	        return productoService.actualizarProducto(id, productDetails);
	        
	        
	    }

	    // Eliminar un producto
	    @DeleteMapping("/{id}")
	    @Operation(summary = "Eliminar un producto", description = "Elimina un producto y lo guarda en la base de datos")
	    @PreAuthorize("hasRole('ROLE_ADMIN')")
	    @ApiResponse(responseCode = "200", description = "Producto eliminado con éxito")
	    @ApiResponse(responseCode = "404", description = "Producto no encontrado")
	    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
	        try {
	            boolean productoEliminado = productoService.eliminarProducto(id);

	            if (productoEliminado) {
	                return ResponseEntity.ok("Producto eliminado.");
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
	            }
	        } catch (Exception ex) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
	        }
	    }
	//    @GetMapping("/camisetas")
	 //   public ResponseEntity<Page<Producto>> filtrarPorColores(@RequestParam Camiseta categoria, Pageable pageable) {
	      //  Page<Producto> productos = productoService.filtrarPorCategoria(categoria, pageable);
	    //}
	    // VVVV los precios serán segun el tipo de producto

	    @GetMapping("/filtrarPorPrecio")
	    public ResponseEntity<Page<Producto>> filtrarPorPrecio(@RequestParam Double precio, Pageable pageable) {
	        Page<Producto> productos = productoService.filtrarPorPrecio(precio, precio, pageable);
	        return ResponseEntity.ok(productos);
	    }
	    
	/*
	    @PostMapping("/{productoId}/reservar")
	    @PreAuthorize("hasRole('ROLE_USER')")
	    public ResponseEntity<?> realizarReserva(@PathVariable Long productoId, @AuthenticationPrincipal Usuario usuario) {
	        try {
	            logger.info("ProductosController :: realizarReserva id Producto: {} Usuario: {}", productoId, usuario.getUsername());

	            if (!reservaService.esProductoDisponibleParaReserva(productoId)) {
	                ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
	                        new Date(),
	                        "Conflicto",
	                        "El producto no está disponible para reserva."
	                );
	                return ResponseEntity.status(HttpStatus.CONFLICT).body(errorDetails);
	            }

	            LocalDate fechaReserva = LocalDate.now();
	            LocalDate fechaExpiracion = fechaReserva.plusDays(7);

	            Long usuarioId = usuario.getId();
	            Reserva reserva = reservaService.crearReserva(productoId, usuarioId, fechaReserva, fechaExpiracion);
	            DetailsResponse details_reserva = new DetailsResponse(
	                    new Date(),
	                    "Reservado:'" + reserva.getProducto().getNombre() + "', " + reserva.getProducto().getDescripcion(),
	                    "Expiración reserva:'" + reserva.getFechaExpiracion() + "'"
	            );
	            return ResponseEntity.status(HttpStatus.CREATED).body(details_reserva);
	        } catch (EntityNotFoundException e) {
	            ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
	                    new Date(),
	                    "No encontrado",
	                    e.getMessage()
	            );
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorDetails);
	        } catch (Exception e) {
	            ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
	                    new Date(),
	                    "Error interno del servidor",
	                    e.getMessage()
	            );
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDetails);
	        }
	    }*/
	    }
	    
	    
	    
	