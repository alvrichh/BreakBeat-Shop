package com.shop.breakbeat.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

public class Camiseta extends Categoria {

	
    @NotBlank(message = "El color de la camiseta no puede estar vacío.")
   // @Enumerated(EnumType.STRING)
    private Color color;

    @NotBlank(message = "El tamaño de la camiseta no puede estar vacío.")
   // @Enumerated(EnumType.STRING)
	private Size size;

    /*
    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;
*/
	
	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	public Size getSize() {
		return size;
	}

	public void setSize(Size size) {
		this.size = size;
	}


}
