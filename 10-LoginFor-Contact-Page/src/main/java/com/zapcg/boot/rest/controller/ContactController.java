package com.zapcg.boot.rest.controller;


import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zapcg.boot.rest.entity.Contact;
import com.zapcg.boot.rest.repository.ContactRepository;

@RestController
public class ContactController {

	@Autowired
	private ContactRepository conRepo;
	
	
	@CrossOrigin
	@RequestMapping(value = "/save", consumes = {"application/json"})
	public ResponseEntity<String> saveContact(@RequestBody @Valid Contact contact, BindingResult result){
		System.out.println(contact);
		if(result.hasErrors()) {
			return new ResponseEntity<String>("Contact Not Saved", HttpStatus.BAD_REQUEST);
		}else {
			conRepo.save(contact);
			return new ResponseEntity<String>("Contact Saved Succesfully", HttpStatus.OK);
		}
	}
	@CrossOrigin
	@RequestMapping(value = "/edit/{id}", consumes = {"application/json"})
	public ResponseEntity<?> editContact(@PathVariable(value = "id") String id ){
		Contact contact= null;
		try {
			contact = conRepo.findById(id).get();
		}catch (Exception e) {
			System.out.println(e.toString());
		}
		if(contact!=null) {
			conRepo.save(contact);
			return new ResponseEntity<Contact>(contact, HttpStatus.OK);
		}else
     		return new ResponseEntity<String>("No Contact found", HttpStatus.BAD_REQUEST);
	}
	@CrossOrigin
	@RequestMapping(value = "/delete/{id}", consumes = {"application/json"})
	public ResponseEntity<?> deleteContact(@PathVariable(value = "id") String id ){
		Contact contact= null;
		try {
			contact = conRepo.findById(id).get();
		}catch (Exception e) {
			System.out.println(e.toString());
		}
		if(contact!=null) {
			conRepo.delete(contact);
			return new ResponseEntity<String>("Contact Deleted Succesfully!!!", HttpStatus.OK);
		}else
     		return new ResponseEntity<String>("No Contact found", HttpStatus.BAD_REQUEST);
	}
	
	
}