package com.zapcg.boot.rest.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.zapcg.boot.rest.entity.Contact;
import com.zapcg.boot.rest.entity.User;
import com.zapcg.boot.rest.repository.UserRepository;

@RestController
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserRepository userRepo;

	private static final Gson gson = new Gson();
	
	@PostMapping(value = "/users")
	public ResponseEntity<?> getUsers(Model model){
		List<User> users = new ArrayList<>();
		Iterable<User> list =  userRepo.findAll();
		list.forEach(t -> users.add(t));
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}
	
	@PostMapping(value = "/adduser", consumes = {"application/json"})
	public ResponseEntity<String> saveContact(@RequestBody @Valid User user, BindingResult result){
		if(result.hasErrors() || userRepo.existsById(user.getUsername()) ) {
			return new ResponseEntity<String>(gson.toJson("User already Exist try Different username"), HttpStatus.BAD_REQUEST);
		}else{
			userRepo.save(user);
			return new ResponseEntity<String>(gson.toJson("User added Succesfully!!"), HttpStatus.OK);
		}
	}
	
}
