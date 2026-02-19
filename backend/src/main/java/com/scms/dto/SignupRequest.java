package com.scms.dto;

import lombok.Data;

@Data
public class SignupRequest {

	private String username;
	private String fullName;
	private String email;
	private String password;
	private String role;

}
