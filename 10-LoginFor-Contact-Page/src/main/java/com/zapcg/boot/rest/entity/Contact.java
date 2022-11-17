package com.zapcg.boot.rest.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {

	@Id
	private String contactId;
	private String contactName;
	private String contactEmail;
	private String contactNumber;
}
