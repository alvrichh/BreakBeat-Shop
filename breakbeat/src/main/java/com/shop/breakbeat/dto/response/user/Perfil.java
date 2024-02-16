package com.shop.breakbeat.dto.response.user;

public class Perfil {
		
		private String username;
		private String nombre;
		private String apellidos;
	    private String email;
	    private String rol;
	    
	    
		
		public Perfil(String username, String nombre, String apellidos, String email, String rol) {
			super();
			this.username = username;
			this.nombre = nombre;
			this.apellidos = apellidos;
			this.email = email;
			this.rol = rol;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getNombre() {
			return nombre;
		}
		public void setNombre(String nombre) {
			this.nombre = nombre;
		}
		public String getApellidos() {
			return apellidos;
		}
		public void setApellidos(String apellidos) {
			this.apellidos = apellidos;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getRol() {
			return rol;
		}
		public void setRol(String rol) {
			this.rol = rol;
		}
	    

}