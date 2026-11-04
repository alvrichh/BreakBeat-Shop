package com.shop.breakbeat.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "camisetas")
public class Camiseta extends Producto {


	public Camiseta(Long id, @NotBlank(message = "El nombre del producto no puede estar vacío.") String nombre,
			@NotBlank(message = "La descripción del producto es obligatoria.") String descripcion,
			@NotBlank(message = "El precio no puede estar vacío.") @jakarta.validation.constraints.Size(min = 0, message = "El precio no puede ser inferior a 0.") Double precio) {
		super(id, nombre, descripcion, precio);
	}

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
