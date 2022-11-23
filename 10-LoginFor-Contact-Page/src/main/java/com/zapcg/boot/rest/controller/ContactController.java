package com.zapcg.boot.rest.controller;

import java.util.List;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.google.gson.Gson;
import com.zapcg.boot.rest.entity.AuthRequest;
import com.zapcg.boot.rest.entity.Contact;
import com.zapcg.boot.rest.jwt.utils.JwtUtil;
import com.zapcg.boot.rest.repository.ContactRepository;

@RestController
@CrossOrigin(origins = "*")
@EnableAutoConfiguration
public class ContactController {

	@Autowired
	private ContactRepository conRepo;
	
	@Autowired(required = true)
	private JwtUtil jwtUtil;
	@Autowired
	private AuthenticationManager authenticationManager;

	private static final Gson gson = new Gson();

	@PostMapping("/authenticate")
	public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
		} catch (Exception ex) {
			throw new Exception("invalid username/password=> " + ex);
		}
		return gson.toJson(jwtUtil.generateToken(authRequest.getUsername()));
	}

	@RequestMapping(value = "/save", consumes = { "application/json" })
	public ResponseEntity<String> saveContact(@RequestBody @Valid Contact contact, BindingResult result) {
		if (result.hasErrors()) {
			return new ResponseEntity<String>(gson.toJson("Contact Not Saved"), HttpStatus.OK);
		}else if (conRepo.existsById(contact.getContactId())) {
			return new ResponseEntity<String>(gson.toJson("Duplicate Contact ID"), HttpStatus.OK);
		}else {
			conRepo.save(contact);
			return new ResponseEntity<String>(gson.toJson("Contact Saved Succesfully"), HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/edit", consumes = { "application/json" })
	public ResponseEntity<?> editContact(@RequestBody @Valid Contact contact, BindingResult result) {
		if (result.hasErrors()) {
			return new ResponseEntity<Contact>(contact, HttpStatus.OK);
		}else if (conRepo.existsById(contact.getContactId())) {
			conRepo.save(contact);
			return new ResponseEntity<String>("Contact Edited!!", HttpStatus.OK);
		} else
			return new ResponseEntity<String>(gson.toJson("No Contact found"), HttpStatus.BAD_REQUEST);
	}

	@JsonBackReference
	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<?> deleteContact(@PathVariable(value = "id") String id) {
		Contact contact = null;
		try {
			contact = conRepo.findById(id).get();
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		if (contact != null) {
			conRepo.delete(contact);
			return new ResponseEntity<String>(gson.toJson("Contact Deleted Succesfully!!!"), HttpStatus.OK);
		} else
			return new ResponseEntity<String>(gson.toJson("No Contact found"), HttpStatus.OK);
	}

	@RequestMapping(value = "/allContacts", produces = { "application/json" })
	public ResponseEntity<?> allContacts() {
		List<Contact> contacts = null;
		try {
			contacts = (List<Contact>) conRepo.findAll();
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		if (contacts != null) {
			return new ResponseEntity<List<Contact>>(contacts, HttpStatus.OK);
		} else
			return new ResponseEntity<String>(gson.toJson("No Contacts found"), HttpStatus.BAD_REQUEST);
	}

}
