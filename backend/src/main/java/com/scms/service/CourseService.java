package com.scms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scms.model.Course;
import com.scms.repository.CourseRepository;

@Service
public class CourseService {

	@Autowired
	private CourseRepository courseRepository;

	public Course addCourse(Course course) {

		return courseRepository.save(course);
	}

	public Course updateCourse(Course course) {

		return courseRepository.save(course);
	}

	public String deleteCourse(String courseCode) {

		courseRepository.deleteByCourseCode(courseCode);
		return "Course is deleted sucessfully";
	}

	public List<Course> getAllCourses() {

		return courseRepository.findAll();
	}

	public Optional<Course> getCourse(String courseCode) {
		return courseRepository.findByCourseCode(courseCode);
	}

}
