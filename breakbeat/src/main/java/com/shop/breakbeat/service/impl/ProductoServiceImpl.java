package com.shop.breakbeat.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shop.breakbeat.entities.Producto;
import com.shop.breakbeat.error.exception.ProductoNotFoundException;

import com.shop.breakbeat.repository.ProductoRepository;
import com.shop.breakbeat.service.ProductoService;

import jakarta.validation.Valid;

/**
 * Implementación del servicio para gestionar productos.
 */
@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    /**
     * Agrega un nuevo producto.
     *
     * @param producto El producto a agregar.
     * @return El producto agregado.
     */
    @Override
    public Producto agregarProducto(@Valid Producto producto) {
        // Aquí se lanzará una excepción si el producto no es válido
        return productoRepository.save(producto);
    }

    /**
     * Obtiene un producto por su ID.
     *
     * @param id El ID del producto.
     * @return El producto encontrado.
     * @throws ProductoNotFoundException Si el producto no se encuentra.
     */
    @Override
    public Producto obtenerProductoPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNotFoundException("Producto no encontrado."));
    }

    /**
     * Actualiza un producto existente.
     *
     * @param id             El ID del producto a actualizar.
     * @param detallesProducto Los detalles actualizados del producto.
     * @return El producto actualizado.
     */
    @Override
    public Producto actualizarProducto(Long id, @Valid Producto detallesProducto) {
        Producto producto = obtenerProductoPorId(id);

        // Actualiza otros campos necesarios
        return productoRepository.save(producto);
    }

    /**
     * Elimina un producto por su ID.
     *
     * @param id El ID del producto a eliminar.
     * @return `true` si el producto se eliminó correctamente, `false` si no.
     */
    @Override
    public boolean eliminarProducto(Long id) {
        try {
            productoRepository.deleteById(id);
            return true; // o false dependiendo del resultado de la operación
        } catch (Exception e) {
            // Manejar la excepción, si es necesario
            return false;
        }
    }

    /**
     * Obtiene una página de productos.
     *
     * @param pageable La información de paginación.
     * @return La página de productos.
     */
    @Override
    public Page<Producto> listarTodosLosProductos(Pageable pageable) {
        return productoRepository.findAll(pageable);
    }

    /**
     * Filtra productos por rango de precio.
     *
     * @param precioMin El precio mínimo.
     * @param precioMax El precio máximo.
     * @param pageable  La información de paginación.
     * @return La página de productos filtrados por precio.
     */
    @Override
    public Page<Producto> findByPrecioBetween(Double precioMin, Double precioMax, Pageable pageable) {
        if (precioMin != null || precioMax != null) {
            try {
                // Utiliza el método del repositorio para filtrar por precio
                return productoRepository.findByPrecioBetween(precioMin, precioMax, pageable);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Parámetros de precio no válidos.", e);
            }
        } else {
            // Si no se proporcionan parámetros de precio, simplemente obtén todos los productos paginados
            return productoRepository.findAll(pageable);
        }
    }
}
