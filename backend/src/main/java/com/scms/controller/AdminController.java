package com.scms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scms.model.Course;
import com.scms.model.Faculty;
import com.scms.model.Student;
import com.scms.service.CourseService;
import com.scms.service.FacultyService;
import com.scms.service.StudentService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private StudentService studentService;

	@Autowired
	private FacultyService facultyService;

	@Autowired
	private CourseService courseService;

	@GetMapping("/test")
	public String test() {
		return "Controller is working!";
	}

	// ---------------- STUDENT OPERATIONS ----------------

	@PostMapping("/students/add")
	public ResponseEntity<Student> addStudent(@RequestBody Student student) {
		return ResponseEntity.ok(studentService.addStudent(student));
	}

	@PutMapping("/students/update")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
		return ResponseEntity.ok(studentService.updateStudent(student));
	}

	@DeleteMapping("/students/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
		studentService.deleteStudent(id);
		return ResponseEntity.ok("Student deleted successfully!");
	}

	@GetMapping("/students/all")
	public ResponseEntity<List<Student>> getAllStudents() {
		return ResponseEntity.ok(studentService.getAllStudents());
	}

	@GetMapping("/students/{id}")
	public ResponseEntity<Optional<Student>> getStudentById(@PathVariable Long id) {
		return ResponseEntity.ok(studentService.getStudent(id));
	}

	// ---------------- FACULTY OPERATIONS ----------------

	@PostMapping("/faculty/add")
	public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty faculty) {
		return ResponseEntity.ok(facultyService.addFaculty(faculty));
	}

	@PutMapping("/faculty/update")
	public ResponseEntity<Faculty> updateFaculty(@RequestBody Faculty faculty) {
		return ResponseEntity.ok(facultyService.updateFaculty(faculty));
	}

	@DeleteMapping("/faculty/delete/{id}")
	public ResponseEntity<String> deleteFaculty(@PathVariable Long id) {
		facultyService.deleteFaculty(id);
		return ResponseEntity.ok("Faculty deleted successfully!");
	}

	@GetMapping("/faculty/all")
	public ResponseEntity<List<Faculty>> getAllFaculty() {
		return ResponseEntity.ok(facultyService.getAllFaculty());
	}

	@GetMapping("/faculty/{id}")
	public ResponseEntity<Optional<Faculty>> getFacultyById(@PathVariable Long id) {
		return ResponseEntity.ok(facultyService.getFaculty(id));
	}

	// ---------------- COURSE OPERATIONS ----------------

	@PostMapping("/courses/add")
	public ResponseEntity<Course> addCourse(@RequestBody Course course) {
		return ResponseEntity.ok(courseService.addCourse(course));
	}

	@PutMapping("/courses/update")
	public ResponseEntity<Course> updateCourse(@RequestBody Course course) {
		return ResponseEntity.ok(courseService.updateCourse(course));
	}

	@DeleteMapping("/courses/{code}")
	public ResponseEntity<String> deleteCourse(@PathVariable String code) {
		courseService.deleteCourse(code);
		return ResponseEntity.ok("Course deleted successfully!");
	}

	@GetMapping("/courses/all")
	public ResponseEntity<List<Course>> getAllCourses() {
		return ResponseEntity.ok(courseService.getAllCourses());
	}

	@GetMapping("/courses/{code}")
	public ResponseEntity<Optional<Course>> getCourseByCode(@PathVariable String code) {
		return ResponseEntity.ok(courseService.getCourse(code));
	}
}
