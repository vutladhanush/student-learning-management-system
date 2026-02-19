package com.scms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scms.model.Course;
import com.scms.model.Faculty;
import com.scms.model.Grade;
import com.scms.model.Student;
import com.scms.repository.CourseRepository;
import com.scms.repository.FacultyRepository;
import com.scms.repository.GradeRepository;
import com.scms.repository.StudentRepository;

@Service
public class FacultyService  {

	@Autowired
	private FacultyRepository facultyRepository;

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private GradeRepository gradeRepository;

	
	public Optional<Faculty> getFaculty(Long id) {

		return facultyRepository.findById(id);
	}

	
	public List<Faculty> getAllFaculty() {

		return facultyRepository.findAll();
	}

	
	public Faculty addFaculty(Faculty faculty) {

		return facultyRepository.save(faculty);
	}

	 
	public Faculty updateFaculty(Faculty faculty) {

		return facultyRepository.save(faculty);
	}

	 
	public String deleteFaculty(Long id) {

		facultyRepository.deleteById(id);
		return "faculty deleted sucessfully";
	}

	 
	public Optional<Student> getStudent(Long id) {

		return studentRepository.findById(id);
	}
 
	public Optional<Course> getCourse(String courseCode) {
		return courseRepository.findByCourseCode(courseCode);
	}

 
	public Grade addGrade(Grade grade) {
		// TODO Auto-generated method stub
		return null;
	}

}
