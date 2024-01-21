package com.example.eventmanagerrestservice.home;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eventmanagerrestservice.dto.LoginDTO;
import com.example.eventmanagerrestservice.dto.SignUpDTO;
import com.example.eventmanagerrestservice.role.Role;
import com.example.eventmanagerrestservice.role.RoleRepository;
import com.example.eventmanagerrestservice.user.Users;
import com.example.eventmanagerrestservice.user.UsersRepository;

@RestController
@RequestMapping("/api")
public class HomeController {
	private AuthenticationManager authenticationManager;
	private BCryptPasswordEncoder passwordEncoder;
	private UsersRepository usersRepository;
	private RoleRepository roleRepository;
	
	public HomeController(AuthenticationManager authenticationManager, BCryptPasswordEncoder passwordEncoder,
			UsersRepository usersRepository, RoleRepository roleRepository) {
		super();
		this.authenticationManager = authenticationManager;
		this.passwordEncoder = passwordEncoder;
		this.usersRepository = usersRepository;
		this.roleRepository = roleRepository;
	}
	
	@PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDTO loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUserName(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User login successfully!...", HttpStatus.OK);
    }
	
	@PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDTO signUpDto){
        // checking for username exists in a database
        if(usersRepository.existsByUserName(signUpDto.getUserName())){
            return new ResponseEntity<>("Username is already exist!", HttpStatus.BAD_REQUEST);
        }
        // checking for email exists in a database
        if(usersRepository.existsByEmail(signUpDto.getEmail())){
            return new ResponseEntity<>("Email is already exist!", HttpStatus.BAD_REQUEST);
        }
        // creating user object
        Users user = new Users();
        user.setName(signUpDto.getName());
        user.setUsername(signUpDto.getUserName());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        Role roles = roleRepository.findByName("ROLE_ADMIN").get();
        user.setRoles(Collections.singleton(roles));
        usersRepository.save(user);
        return new ResponseEntity<>("User is registered successfully!", HttpStatus.OK);
    }
}

