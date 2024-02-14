package com.shop.breakbeat.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/api/v1/camisetas")
public class CamisetaController {

	private static final Logger logger = LoggerFactory.getLogger(CamisetaController.class);

	@Autowired
	private ProductoService productoService;

	@GetMapping
	public ResponseEntity<Page<Camiseta>> getAllCamisetas(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		logger.info("CamisetaController :: listarTodosLosProductos");
		Pageable pageable = PageRequest.of(page, size);
		Page<Camiseta> camiseta = productoService.listarTodosLosProductos(pageable);

		return new ResponseEntity<>(camiseta, HttpStatus.OK);

	}
}
