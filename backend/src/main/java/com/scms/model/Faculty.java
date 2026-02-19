package com.scms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Faculty {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "first name should be empty or null")
	private String firstName;

	@NotBlank(message = "last name should not be empty or null")
	private String lastName;

	@NotBlank(message = "department should not be empty or null")
	private String department;

	@NotBlank(message = "faculty should not be empty or null")
	private String facultyName;

	@NotBlank(message = "Email should not be empty or null")
	private String email;

}
