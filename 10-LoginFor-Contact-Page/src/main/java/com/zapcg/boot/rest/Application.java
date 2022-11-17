package com.zapcg.boot.rest;

import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.zapcg.boot.rest.entity.User;
import com.zapcg.boot.rest.repository.UserRepository;

@SpringBootApplication
public class Application {

	@Autowired
	private UserRepository userRepo;
	
	@PostConstruct
	public void saveAll() {
		List<User> list = Arrays.asList(
				new User("shivanand", "1234", "s@gmail"),
				new User("chetan", "1234", "c@gmail"),
				new User("raghu", "1234", "r@gmail")
				);
//		userRepo.saveAll(list);
	}
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
