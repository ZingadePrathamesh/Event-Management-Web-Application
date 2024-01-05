package com.example.eventmanagerrestservice.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicAuthentication {
	@GetMapping(path="/basicauth")
	public String basicAuth() {
		return "Success";
	}
}
