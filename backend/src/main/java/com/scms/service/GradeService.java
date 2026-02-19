package com.scms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scms.model.Grade;
import com.scms.repository.GradeRepository;

@Service
public class GradeService  {

	@Autowired
	private GradeRepository gradeRepository;

 
	public Grade addGrade(Grade grade) {

		return gradeRepository.save(grade);
	}

	 
	public List<Grade> getAllGrades() {
		return gradeRepository.findAll();
	}

	public List<Grade> getGradesByStudentId(Long studentId) {
		return gradeRepository.findByStudentId(studentId);
	}

 
	public Optional<Grade> getGrade(String courseCode) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

}
