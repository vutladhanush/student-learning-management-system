package com.scms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.scms.model.Course;
import com.scms.service.CourseService;

@RestController
public class CourseController {

	@Autowired
	private CourseService courseService;

	@GetMapping("/all")
	public ResponseEntity<List<Course>> getAllCourses() {
		List<Course> courses = courseService.getAllCourses();
		return ResponseEntity.ok(courses);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Course> getCourse(@PathVariable String courseCode) {
		Optional<Course> course = courseService.getCourse(courseCode);
		return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}
