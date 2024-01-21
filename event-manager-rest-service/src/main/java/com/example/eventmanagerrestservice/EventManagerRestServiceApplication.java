package com.example.eventmanagerrestservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.eventmanagerrestservice.role.Role;
import com.example.eventmanagerrestservice.role.RoleRepository;

@SpringBootApplication
public class EventManagerRestServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventManagerRestServiceApplication.class, args);
	}
	
	@Bean
	public WebMvcConfigurer CorsConfigurer() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedMethods("*")
				.allowedOrigins("http://localhost:3000");
			}
		};
	}
	
    @Bean
    public CommandLineRunner demo(RoleRepository roleRepo) {
        return (args) -> {
        	if(roleRepo.findByName("ROLE_ADMIN").orElse(null) != null) {
        		
        	}
        	else {
        		Role role=new Role();
                role.setName("ROLE_ADMIN");
                roleRepo.save(role);
        	}
        };
    }

}
