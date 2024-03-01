package com.shop.breakbeat.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.shop.breakbeat.entities.Producto;

/**
 * Interfaz que define operaciones relacionadas con productos en el sistema.
 */
public interface ProductoService {

    /**
     * Agrega un nuevo producto al sistema.
     *
     * @param producto El producto a ser agregado.
     * @return El producto agregado.
     */
    Producto agregarProducto(Producto producto);

    /**
     * Actualiza un producto existente en el sistema.
     *
     * @param id            El ID del producto a actualizar.
     * @param producto      Los detalles actualizados del producto.
     * @return El producto actualizado.
     */
    Producto actualizarProducto(Long id, Producto producto);

    /**
     * Elimina un producto del sistema.
     *
     * @param id El ID del producto a eliminar.
     * @return `true` si la eliminación fue exitosa, `false` en caso contrario.
     */
    boolean eliminarProducto(Long id);

    /**
     * Obtiene un producto por su ID.
     *
     * @param id El ID del producto a buscar.
     * @return El producto encontrado o `null` si no se encuentra.
     */
    Producto obtenerProductoPorId(Long id);

    /**
     * Obtiene una página de productos paginados.
     *
     * @param pageable Configuración de paginación.
     * @return Página de productos.
     */
    Page<Producto> listarTodosLosProductos(Pageable pageable);

    /**
     * Filtra productos por rango de precio.
     *
     * @param precioMin Precio mínimo.
     * @param precioMax Precio máximo.
     * @param pageable  Configuración de paginación.
     * @return Página de productos filtrados por precio.
     */
    Page<Producto> findByPrecioBetween(Double precioMin, Double precioMax, Pageable pageable);

}
