package com.scms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scms.model.Assignments;

@Repository
public interface AssignmentsRepository extends JpaRepository<Assignments, Long> {

}
