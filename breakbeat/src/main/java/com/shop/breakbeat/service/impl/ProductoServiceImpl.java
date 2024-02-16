package com.shop.breakbeat.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.shop.breakbeat.entities.Producto;
import com.shop.breakbeat.error.exception.ProductoNotFoundException;

import com.shop.breakbeat.repository.ProductoRepository;
import com.shop.breakbeat.service.ProductoService;

import jakarta.validation.Valid;

public class ProductoServiceImpl implements ProductoService {

	 @Autowired
	    private ProductoRepository productoRepository;
	    
	    @Override
	    public Producto agregarProducto(@Valid Producto producto) {
	        // Aquí se lanzará una excepción si el libro no es válido
	        return productoRepository.save(producto);
	    }

	    @Override
	    public Producto obtenerProductoPorId(Long id) {
	        return productoRepository.findById(id)
	                .orElseThrow(() -> new ProductoNotFoundException("Libro no encontrado"));
	    }

	    @Override
	    public Producto actualizarProducto(Long id, @Valid Producto detallesLibro) {
	    	Producto producto = obtenerProductoPorId(id);

	        // Actualiza otros campos necesarios
	        return productoRepository.save(producto);
	    }

	    @Override
	    public void eliminarProducto(Long id) {
	    	productoRepository.deleteById(id);
	    }

		@Override
		public Page<Producto> listarTodosLosProductos(Pageable pageable) {
			 return productoRepository.findAll(pageable);
		}

}
