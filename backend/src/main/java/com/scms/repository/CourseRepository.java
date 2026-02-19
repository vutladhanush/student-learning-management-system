package com.scms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scms.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

	Optional<Course> findByCourseCode(String courseCode);

	Optional<Course> deleteByCourseCode(String courseCode);

	Optional<Course> getByCourseCode(String courseCode);

}
