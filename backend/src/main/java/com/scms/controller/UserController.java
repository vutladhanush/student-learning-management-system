package com.scms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scms.dto.LoginRequest;
import com.scms.dto.SignupRequest;
import com.scms.model.User;
import com.scms.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*") // allow frontend
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/signup")
	public User signup(@RequestBody SignupRequest request) {
		return userService.registerUser(request);
	}

	@PostMapping("/login")
	public String login(@RequestBody LoginRequest request) {
		return userService.login(request);
	}
}
