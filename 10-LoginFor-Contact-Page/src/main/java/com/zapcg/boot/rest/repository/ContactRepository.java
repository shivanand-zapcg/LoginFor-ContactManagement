package com.zapcg.boot.rest.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.zapcg.boot.rest.entity.Contact;

public interface ContactRepository extends CrudRepository<Contact, Serializable> {

}
