package com.shop.breakbeat.controller.user;

import com.shop.breakbeat.dto.response.user.UsuarioDTO;
import com.shop.breakbeat.entities.Usuario;
import com.shop.breakbeat.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controlador para gestionar las operaciones de autorización de usuarios.
 */
@RestController
@RequestMapping("/api/v1/users")
public class AuthorizationAdminController {

	private static final Logger logger = LoggerFactory.getLogger(AuthorizationAdminController.class);

	@Autowired
	private UsuarioService userService;

	/**
	 * Obtiene la lista de todos los usuarios.
	 *
	 * @return ResponseEntity con la lista de UsuarioDTO.
	 */
	@GetMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<UsuarioDTO>> showUsers() {
		logger.info("Obtener lista de todos los usuarios.");
		List<UsuarioDTO> userList = userService.getAllUsers();
		return ResponseEntity.ok(userList);
	}

	/**
	 * Obtiene un usuario por su ID.
	 *
	 * @param userId ID del usuario a buscar.
	 * @return ResponseEntity con el UsuarioDTO si se encuentra, o un estado 404 si
	 *         no se encuentra.
	 */
	@GetMapping("/{userId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<Usuario>> showUserById(@PathVariable Long userId) {
		logger.info("Obtener usuario por ID: {}", userId);
		List<Usuario> users = userService.getUserById(userId);

		if (!users.isEmpty()) {
			return ResponseEntity.ok(users);
		} else {
			logger.warn("Usuario no encontrado para ID: {}", userId);
			return ResponseEntity.notFound().build();
		}
	}
}
