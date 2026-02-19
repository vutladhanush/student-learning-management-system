package com.scms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scms.model.Faculty;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {

}
