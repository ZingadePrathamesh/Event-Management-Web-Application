package com.example.eventmanagerrestservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpringSecurityConfiguration {
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//		.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
		http.authorizeHttpRequests(auth->{
			auth.requestMatchers("/api/**").permitAll()
			.anyRequest().authenticated();
		});
		
		http.sessionManagement(session->{
			session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		});
		
		http.headers(head->{
			head.frameOptions(frame->{
				frame.sameOrigin();
			});
		});
		
		http.httpBasic(Customizer.withDefaults());
		http.csrf(csrf->csrf.disable());
		
		return http.build();
	}
 	
	@Bean
	WebMvcConfigurer webMvcConfigurer() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedMethods("*")
				.allowedOrigins("http://localhost:3000");
			}
		};
	}
	
    @Bean
    public static BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
