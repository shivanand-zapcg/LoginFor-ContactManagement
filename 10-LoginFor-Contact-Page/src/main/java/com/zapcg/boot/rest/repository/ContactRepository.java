package com.zapcg.boot.rest.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.zapcg.boot.rest.entity.Contact;
@CrossOrigin(origins= "http://localhost:3000")
public interface ContactRepository extends CrudRepository<Contact, String> {

}
