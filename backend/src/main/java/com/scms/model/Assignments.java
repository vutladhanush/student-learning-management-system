package com.scms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Assignments {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long d;
	private String name;
	private String dueDate;
	private String description;
	private Integer daysremain;
}
