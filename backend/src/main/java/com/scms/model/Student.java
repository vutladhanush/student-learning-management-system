package com.scms.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "students")
@AllArgsConstructor
@NoArgsConstructor
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;

	@Email(message = "Email should be valid")
	@NotBlank(message = "Email should not be null or empty")
	@Column(name = "email_id", nullable = false, unique = true)
	public String email;

	@NotBlank(message = "first name should not be null or empty")
	public String firstName;

	@NotBlank(message = "Last name should not be null or empty")
	@Column
	public String lastName;

	@Min(message = "year should be atleast 1", value = 0)
	public int year;

	@NotBlank(message = "department should not be null or empty")
	public String dept;
	@NotBlank(message = "Mobile number should not be null or empty")
	public String mobileNo;

	@ManyToMany
	@JoinTable(name = "student_courses", joinColumns = @JoinColumn(name = "student_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
	private Set<Course> courses = new HashSet<>();

	public void addCourse(Course course) {
		this.courses.add(course);
	}
}