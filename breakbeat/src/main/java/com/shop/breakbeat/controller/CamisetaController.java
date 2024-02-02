package com.shop.breakbeat.controller;

import com.shop.breakbeat.model.Camiseta;
import com.shop.breakbeat.service.ProductoService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/v1/camisetas")
public class CamisetaController {

	private static final Logger logger = LoggerFactory.getLogger(CamisetaController.class);

	@Autowired
	private ProductoService productoService;

	@GetMapping
	@Operation(summary = "Obtener todas las camisetas", description = "Devuelve una lista paginada de camisetas")
	@ApiResponse(responseCode = "200", description = "Lista de camisetas obtenida exitosamente")
	@ApiResponse(responseCode = "204", description = "No hay camisetas disponibles")
	@ApiResponse(responseCode = "400", description = "Parámetros de solicitud incorrectos")

	public ResponseEntity<Page<Camiseta>> getAllCamisetas(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		logger.info("LibrosController :: listarTodosLosProductos");
		Pageable pageable = PageRequest.of(page, size);
		Page<Camiseta> camiseta = productoService.listarTodosLosProductos(pageable);

		return new ResponseEntity<>(camiseta, HttpStatus.OK);

	}
}
