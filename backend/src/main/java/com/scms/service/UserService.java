package com.scms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scms.dto.LoginRequest;
import com.scms.dto.SignupRequest;
import com.scms.model.User;
import com.scms.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;

	// Signup Logic
	public User registerUser(SignupRequest request) {
		if (userRepo.findByUsername(request.getUsername()) != null) {
			throw new RuntimeException("Username already exists");
		}

		User user = new User();
		user.setUsername(request.getUsername());
		user.setFullName(request.getFullName());
		user.setEmail(request.getEmail());
		user.setPassword(request.getPassword()); // (Hash later)
		user.setRole(request.getRole());

		return userRepo.save(user);
	}

	// Login Logic
	public String login(LoginRequest request) {
		User user = userRepo.findByUsername(request.getUsername());

		if (user == null)
			return "User not found";

		if (!user.getPassword().equals(request.getPassword()))
			return "Invalid password";

		return "Login successful as " + user.getRole();
	}
}
