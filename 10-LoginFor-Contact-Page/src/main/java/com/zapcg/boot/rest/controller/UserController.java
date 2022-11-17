package com.zapcg.boot.rest.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zapcg.boot.rest.entity.User;
import com.zapcg.boot.rest.repository.UserRepository;

@RestController
public class UserController {
	
	@Autowired
	private UserRepository userRepo;

	@CrossOrigin
	@RequestMapping(value = "/users")
	public ResponseEntity<?> getUsers(Model model){
		List<User> users = new ArrayList<>();
		Iterable<User> list =  userRepo.findAll();
		list.forEach(t -> users.add(t));
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}
	
}
