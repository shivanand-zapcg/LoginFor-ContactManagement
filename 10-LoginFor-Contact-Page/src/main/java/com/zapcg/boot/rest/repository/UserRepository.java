package com.zapcg.boot.rest.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.zapcg.boot.rest.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

	User findByUsername(String username);
}
