package com.scms.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "courses")
@AllArgsConstructor
@NoArgsConstructor
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "course code should not be empty or null")
	private String courseCode;

	@NotBlank(message = "course name should not be empty or null")
	private String courseName;

	@NotBlank(message = "department should not be empty or null")
	private String dept;

	@NotBlank(message = "faculty should not be empty or null")
	private String facultyName;

	@Min(value = 1, message = "Credits must be greater than 0")
	private int credits;

	@ManyToMany(mappedBy = "courses")
	private Set<Student> students = new HashSet<>();

}
