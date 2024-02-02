package com.shop.breakbeat.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.shop.breakbeat.model.Camiseta;
import com.shop.breakbeat.error.exception.ProductoNotFoundException;

import com.shop.breakbeat.repository.ProductoRepository;
import com.shop.breakbeat.service.ProductoService;

import jakarta.validation.Valid;

public class ProductoServiceImpl implements ProductoService {

	@Autowired
	private ProductoRepository productoRepository;

	@Override
	public Camiseta agregarProducto(Camiseta producto) {
		// TODO Auto-generated method stub
		return productoRepository.save(producto);
	}

	@Override
	public Camiseta actualizarProducto(Long id, @Valid Camiseta detallesCamiseta) {
		Camiseta camiseta = obtenerProductoPorId(id);
		camiseta.setNombre(detallesCamiseta.getNombre());
		camiseta.setDescripcion(detallesCamiseta.getDescripcion());
		camiseta.setPrecio(detallesCamiseta.getPrecio());
		return productoRepository.save(camiseta);
	}

	@Override
	public void eliminarProducto(Long id) {
		productoRepository.deleteById(id);
	}

	@Override
	public Camiseta obtenerProductoPorId(Long id) {
		return (Camiseta) productoRepository.findById(id)
				.orElseThrow(() -> new ProductoNotFoundException("Producto no encontrado")) ;
	}

	@Override
	public Page<Camiseta> listarTodosLosProductos(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}



}
