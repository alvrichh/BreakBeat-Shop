package com.shop.breakbeat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shop.breakbeat.entities.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {


	//Page<Producto> findByPrecioBetween(Double precioMin, Double precioMax, Pageable pageable);
	
}