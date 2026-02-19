package com.scms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scms.model.Course;
import com.scms.model.Faculty;
import com.scms.model.Grade;
import com.scms.model.Student;
import com.scms.service.CourseService;
import com.scms.service.FacultyService;
import com.scms.service.GradeService;
import com.scms.service.StudentService;

@RestController
@RequestMapping("/faculty")
public class FacultyController {

	@Autowired
	private FacultyService facultyService;

	@Autowired
	private CourseService courseService;

	@Autowired
	private StudentService studentService;

	@Autowired
	private GradeService gradeService;

	@GetMapping("/all")
	public ResponseEntity<List<Faculty>> getAllFaculty() {
		return ResponseEntity.ok(facultyService.getAllFaculty());
	}

	@PostMapping("/add")
	public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty faculty) {
		return ResponseEntity.ok(facultyService.addFaculty(faculty));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Faculty> getFaculty(@PathVariable Long id) {
		Optional<Faculty> faculty = facultyService.getFaculty(id);
		return faculty.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteFaculty(@PathVariable Long id) {
		facultyService.deleteFaculty(id);
		return ResponseEntity.ok("Faculty deleted successfully");
	}

	@GetMapping("/courses")
	public ResponseEntity<List<Course>> getAllCourses() {
		List<Course> courses = courseService.getAllCourses();

		if (courses.isEmpty()) {
			return ResponseEntity.noContent().build(); // 204 No Content if no courses
		}

		return ResponseEntity.ok(courses); // 200 OK with courses
	}

	@GetMapping("/course/{courseCode}")
	public ResponseEntity<Course> getCourse(@PathVariable String courseCode) {
		return courseService.getCourse(courseCode).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@GetMapping("student/{id}")
	public ResponseEntity<Student> getStudent(@PathVariable Long id) {
		Optional<Student> student = studentService.getStudent(id);
		return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping("/grades")
	public ResponseEntity<Grade> addGrade(@RequestBody Grade grade) {
		Grade savedGrade = gradeService.addGrade(grade);
		return ResponseEntity.ok(savedGrade);
	}

}
