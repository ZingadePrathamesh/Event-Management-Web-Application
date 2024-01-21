package com.example.eventmanagerrestservice.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Integer> {
	Users findByUserNameOrEmail(String username, String email);

	boolean existsByUserName(String userName);

	boolean existsByEmail(String email);
}
