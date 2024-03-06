package com.shop.breakbeat.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shop.breakbeat.entities.Producto;
import com.shop.breakbeat.service.ProductoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class ProductosControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private ProductoService productoService;

    @InjectMocks
    private ProductosController productosController;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void listarTodosLosProductosDeberiaRetornarListaPaginada() throws Exception {
        // Configurar datos de prueba
        List<Producto> productos = new ArrayList<>();
        productos.add(new Producto(1L, "Camiseta", "Camiseta de algodón", 19.99));
        productos.add(new Producto(2L, "Zapatillas", "Zapatillas deportivas", 49.99));

        // Configurar comportamiento del servicio mock
        when(productoService.listarTodosLosProductos(any())).thenReturn(new PageImpl<>(productos));

        // Realizar la solicitud GET y verificar el resultado
        mockMvc.perform(get("/api/v1/productos"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.content[0].nombre").value("Camiseta"))
               .andExpect(jsonPath("$.content[1].nombre").value("Zapatillas"));
    }

    @Test
    void getProductByIdDeberiaRetornarProductoExistente() throws Exception {
        // Configurar datos de prueba
        Long productoId = 1L;
        Producto producto = new Producto(productoId, "Camiseta", "Camiseta de algodón", 19.99);

        // Configurar comportamiento del servicio mock
        when(productoService.obtenerProductoPorId(productoId)).thenReturn(producto);

        // Realizar la solicitud GET y verificar el resultado
        mockMvc.perform(get("/api/v1/productos/{id}", productoId))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.nombre").value("Camiseta"))
               .andExpect(jsonPath("$.descripcion").value("Camiseta de algodón"))
               .andExpect(jsonPath("$.precio").value(19.99));
    }

    @Test
    void getProductByIdDeberiaRetornarNotFoundParaProductoInexistente() throws Exception {
        // Configurar datos de prueba
        Long productoId = 1L;

        // Configurar comportamiento del servicio mock
        when(productoService.obtenerProductoPorId(productoId)).thenReturn(null);

        // Realizar la solicitud GET y verificar el resultado
        mockMvc.perform(get("/api/v1/productos/{id}", productoId))
               .andExpect(status().isNotFound())
               .andExpect(jsonPath("$").value("Producto no encontrado."));
    }

    @Test
    void createProductDeberiaRetornarProductoCreado() throws Exception {
        // Configurar datos de prueba
        Producto nuevoProducto = new Producto(null, "Camiseta", "Camiseta de algodón", 19.99);

        // Configurar comportamiento del servicio mock
        when(productoService.agregarProducto(any())).thenReturn(new Producto(1L, "Camiseta", "Camiseta de algodón", 19.99));

        // Realizar la solicitud POST y verificar el resultado
        mockMvc.perform(post("/api/v1/productos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(nuevoProducto)))
               .andExpect(status().isCreated())
               .andExpect(jsonPath("$.nombre").value("Camiseta"))
               .andExpect(jsonPath("$.descripcion").value("Camiseta de algodón"))
               .andExpect(jsonPath("$.precio").value(19.99));
    }

    @Test
    void updateProductDeberiaRetornarProductoActualizado() throws Exception {
        // Configurar datos de prueba
        Long productoId = 1L;
        Producto productoActualizado = new Producto(productoId, "Camiseta", "Camiseta de algodón", 24.99);

        // Configurar comportamiento del servicio mock
        when(productoService.actualizarProducto(eq(productoId), any())).thenReturn(productoActualizado);

        // Realizar la solicitud PUT y verificar el resultado
        mockMvc.perform(put("/api/v1/productos/{id}", productoId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(productoActualizado)))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.precio").value(24.99));
    }

    @Test
    void deleteProductDeberiaRetornarProductoEliminado() throws Exception {
        // Configurar datos de prueba
        Long productoId = 1L;

        // Configurar comportamiento del servicio mock
        when(productoService.eliminarProducto(productoId)).thenReturn(true);

        // Realizar la solicitud DELETE y verificar el resultado
        mockMvc.perform(delete("/api/v1/productos/{id}", productoId))
               .andExpect(status().isOk())
               .andExpect(content().string("Producto eliminado."));
    }

    @Test
    void deleteProductDeberiaRetornarNotFoundParaProductoInexistente() throws Exception {
        // Configurar datos de prueba
        Long productoId = 1L;

        // Configurar comportamiento del servicio mock
        when(productoService.eliminarProducto(productoId)).thenReturn(false);

        // Realizar la solicitud DELETE y verificar el resultado
        mockMvc.perform(delete("/api/v1/productos/{id}", productoId))
               .andExpect(status().isNotFound())
               .andExpect(content().string("Producto no encontrado"));
    }

    @Test
    void deleteProductDeberiaRetornarInternalServerErrorEnCasoDeError() throws Exception {
        // Configurar datos de prueba
        Long productoId = 1L;

        // Configurar comportamiento del servicio mock
        when(productoService.eliminarProducto(productoId)).thenThrow(new RuntimeException("Error interno"));

        // Realizar la solicitud DELETE y verificar el resultado
        mockMvc.perform(delete("/api/v1/productos/{id}", productoId))
               .andExpect(status().isInternalServerError())
               .andExpect(content().string("Error interno del servidor"));
    }
}
