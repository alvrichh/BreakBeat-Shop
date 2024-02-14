package com.shop.breakbeat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class BreakbeatApplication {

	public static void main(String[] args) {
		SpringApplication.run(BreakbeatApplication.class, args);
	}

}
