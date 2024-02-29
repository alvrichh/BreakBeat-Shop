package com.shop.breakbeat.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.shop.breakbeat.entities.Producto;

public interface ProductoService {
	//CRUD
	Producto agregarProducto(Producto producto);
	
	Producto actualizarProducto(Long id, Producto camiseta);
	
	boolean eliminarProducto(Long id);
	
	//VIEW
	Producto obtenerProductoPorId(Long id);
	
	Page<Producto> listarTodosLosProductos(Pageable pageable);
	
	//FILTROS
    //Page<Producto> filtrarPorCategoria(Categoria categoria, Pageable pageable);

    // Filtrar por precio
    Page<Producto> filtrarPorPrecio(Double precioMin, Double precioMax, Pageable pageable);

}
