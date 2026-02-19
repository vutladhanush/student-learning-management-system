package com.scms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scms.model.Course;
import com.scms.model.Faculty;
import com.scms.model.Student;
import com.scms.repository.CourseRepository;
import com.scms.repository.FacultyRepository;
import com.scms.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private FacultyRepository facultyRepository;

	@Autowired
	private CourseRepository courseRepository;

	public Optional<Student> getStudent(Long id) {
		return studentRepository.findById(id);
	}

	public Student addStudent(Student student) {

		return studentRepository.save(student);
	}

	public boolean deleteStudent(Long id) {

		if (studentRepository.existsById(id)) {
			studentRepository.deleteById(id);
			return true;
		}

		return false;
	}

	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}

	public Student updateStudent(Student student) {

		return studentRepository.save(student);
	}

	public Optional<Course> getCourse(String courseCode) {

		return courseRepository.getByCourseCode(courseCode);
	}

	public List<Course> getAllCourses() {

		return courseRepository.findAll();
	}

	public Optional<Faculty> getFaculty(Long id) {

		return facultyRepository.findById(id);
	}

}
