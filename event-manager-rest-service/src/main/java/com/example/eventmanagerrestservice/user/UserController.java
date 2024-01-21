package com.example.eventmanagerrestservice.user;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	UsersRepository usersRepository;
	
	public UserController(UsersRepository usersRepository) {
		super();
		this.usersRepository = usersRepository;
	}
	
	@GetMapping("/users")
	public List<String> getUsers(){
		List<String> users = usersRepository.findAll().stream().map(user ->user.getName()).toList();
		return users;
	}
}
