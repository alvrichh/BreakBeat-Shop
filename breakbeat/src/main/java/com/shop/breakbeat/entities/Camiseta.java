package com.shop.breakbeat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;


@Entity
@Table(name = "camisetas")
public class Camiseta extends Producto {

    @Enumerated(EnumType.STRING)
	private Color color;
	
    @Enumerated(EnumType.STRING)
	private Size talla;

    // Getters y setters
    
	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	public Size getTalla() {
		return talla;
	}

	public void setTalla(Size talla) {
		this.talla = talla;
	}
	
    
	
}
