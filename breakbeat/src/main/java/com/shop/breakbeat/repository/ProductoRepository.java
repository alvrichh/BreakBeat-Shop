package com.shop.breakbeat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.breakbeat.entities.Producto;

/**
 * Repositorio JPA para operaciones relacionadas con la entidad Producto en la base de datos.
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    /**
     * Busca productos cuyos precios estén en el rango especificado.
     *
     * @param precioMin Precio mínimo del rango.
     * @param precioMax Precio máximo del rango.
     * @param pageable  Información de paginación.
     * @return Una página de productos que cumplen con los criterios de precio.
     */
    Page<Producto> findByPrecioBetween(Double precioMin, Double precioMax, Pageable pageable);

}
