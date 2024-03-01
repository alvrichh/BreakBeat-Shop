package com.shop.breakbeat.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.breakbeat.entities.Producto;
import com.shop.breakbeat.service.ProductoService;

/**
 * Controlador para gestionar las operaciones relacionadas con productos.
 */
@RestController
@RequestMapping("/api/v1/productos")
public class ProductosController {

    private static final Logger logger = LoggerFactory.getLogger(ProductosController.class);

    @Autowired
    private ProductoService productoService;
    /**
     * Obtiene una lista paginada de productos, con opciones de filtrado por precio.
     *
     * @param page      Número de página.
     * @param size      Tamaño de la página.
     * @param precioMin Precio mínimo (opcional).
     * @param precioMax Precio máximo (opcional).
     * @return ResponseEntity con la lista paginada de productos o un mensaje de error.
     */
    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> listarTodosLosProductos(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size,
            @RequestParam(value = "precioMin", required = false) Double precioMin,
            @RequestParam(value = "precioMax", required = false) Double precioMax) {

        logger.info("ProductosController :: listarTodosLosProductos");

        if (precioMin != null & precioMax != null) {
            // Filtrado por precio
            Pageable pageable = PageRequest.of(page, size);
            Page<Producto> resultadoFiltrado = productoService.findByPrecioBetween(precioMin, precioMax, pageable);
            return new ResponseEntity<>(resultadoFiltrado, HttpStatus.OK);
        } else {
            // Listar todos los productos sin filtrado
            Pageable pageable = PageRequest.of(page, size);
            Page<Producto> productos = productoService.listarTodosLosProductos(pageable);
            return new ResponseEntity<>(productos, HttpStatus.OK);
        }
    }


    /**
     * Obtiene un producto por su ID.
     *
     * @param id ID del producto.
     * @return ResponseEntity con el producto si se encuentra, o un estado 404 si no se encuentra.
     */
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

    /**
     * Crea un nuevo producto.
     *
     * @param nuevoProducto Datos del nuevo producto.
     * @return ResponseEntity con el producto creado y el código de estado 201 (CREATED).
     */
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Producto> createProduct(@RequestBody Producto nuevoProducto) {
        logger.info("ProductosController :: createProduct");
        Producto productoCreado = productoService.agregarProducto(nuevoProducto);
        return ResponseEntity.status(HttpStatus.CREATED).body(productoCreado);
    }

    /**
     * Actualiza un producto existente.
     *
     * @param id            ID del producto a actualizar.
     * @param productDetails Datos actualizados del producto.
     * @return El producto actualizado.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Producto updateProduct(@PathVariable Long id, @RequestBody Producto productDetails) {
        logger.info("ProductosController :: updateProduct");
        return productoService.actualizarProducto(id, productDetails);
    }

    /**
     * Elimina un producto por su ID.
     *
     * @param id ID del producto a eliminar.
     * @return ResponseEntity con un mensaje indicando el resultado de la operación.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        logger.info("ProductosController :: deleteProduct");
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
}
