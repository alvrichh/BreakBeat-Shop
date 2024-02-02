package com.shop.breakbeat.service;

import com.shop.breakbeat.model.Camiseta;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ProductoService {
	//CRUD
	Camiseta agregarProducto(Camiseta producto);
	
	Camiseta actualizarProducto(Long id, Camiseta camiseta);
	
	void eliminarProducto(Long id);
	
	//VIEW
	Camiseta obtenerProductoPorId(Long id);
	
	Page<Camiseta> listarTodosLosProductos(Pageable pageable);

}
