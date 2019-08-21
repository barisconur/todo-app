package com.todoapp.backend.repository;

import com.todoapp.backend.modal.ListItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListItemRepository extends MongoRepository<ListItem, Integer> {
}
