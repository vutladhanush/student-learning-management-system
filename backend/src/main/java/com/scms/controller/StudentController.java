package com.scms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping("/student")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@Autowired
	private CourseService courseService;

	@Autowired
	private FacultyService facultyService;

	@Autowired
	private GradeService gradeService;

	// Get Student by ID
	@GetMapping("/{id}")
	public ResponseEntity<Student> getStudent(@PathVariable Long id) {
		Optional<Student> student = studentService.getStudent(id);
		return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// Get All Students
	@GetMapping("/all")
	public ResponseEntity<List<Student>> getAllStudents() {
		List<Student> students = studentService.getAllStudents();
		return ResponseEntity.ok(students);
	}

	// Get All Courses
	@GetMapping("/courses")
	public ResponseEntity<List<Course>> getAllCourses() {
		List<Course> courses = courseService.getAllCourses();
		return ResponseEntity.ok(courses);

	}

	@GetMapping("/course/{courseCode}")
	public ResponseEntity<Course> getCourse(@PathVariable String courseCode) {
		return courseService.getCourse(courseCode).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/{studentId}/grades")
	public ResponseEntity<List<Grade>> getGrades(@PathVariable Long studentId) {
		List<Grade> grades = gradeService.getGradesByStudentId(studentId);
		return ResponseEntity.ok(grades);
	}

	// get faculty
	@GetMapping("faculty/{id}")
	public ResponseEntity<Faculty> getFaculty(@PathVariable Long id) {
		Optional<Faculty> faculty = facultyService.getFaculty(id);
		return faculty.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

}
