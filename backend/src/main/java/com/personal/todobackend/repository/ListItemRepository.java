package com.personal.todobackend.repository;

import com.personal.todobackend.modal.ListItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListItemRepository extends MongoRepository<ListItem, Integer> {
}
