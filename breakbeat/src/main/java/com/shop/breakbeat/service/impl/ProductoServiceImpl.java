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

@Service
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
	                .orElseThrow(() -> new ProductoNotFoundException("Producto no encontrado."));
	    }

	    @Override
	    public Producto actualizarProducto(Long id, @Valid Producto detallesLibro) {
	    	Producto producto = obtenerProductoPorId(id);

	        // Actualiza otros campos necesarios
	        return productoRepository.save(producto);
	    }

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
		@Override
		public Page<Producto> listarTodosLosProductos(Pageable pageable) {
			 return productoRepository.findAll(pageable);
		}
/*
	    @Override
	    public Page<Producto> filtrarPorPrecio(Double precioMin, Double precioMax, Pageable pageable) {
	        return productoRepository.findByPrecioBetween(precioMin, precioMax, pageable);
	    }*/

		@Override
		public Page<Producto> filtrarPorPrecio(Double precioMin, Double precioMax, Pageable pageable) {
			// TODO Auto-generated method stub
			return null;
		}
}
