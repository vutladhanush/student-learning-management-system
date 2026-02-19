package com.scms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;

	// overriding equals method in order to use contains method in
	// CustomAuthenticationSuccessHadler class correctly
	@Override
	public boolean equals(Object comparedObject) {

		if (this == comparedObject) {
			return true;
		}

		if (!(comparedObject instanceof Role)) {
			return false;
		}

		Role comparedRole = (Role) comparedObject;

		if (this.name.equals(comparedRole.name)) {
			return true;
		}

		return false;
	}

}
