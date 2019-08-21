package com.todoapp.backend.controller;

import com.todoapp.backend.modal.ListItem;
import com.todoapp.backend.repository.ListItemRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/list")
public class ListItemController {
     private ListItemRepository listItemRepository;

     public ListItemController(ListItemRepository listItemRepository) {
         this.listItemRepository = listItemRepository;
     }

     @GetMapping
     public List<ListItem> getAll() {
        List<ListItem> listItems = this.listItemRepository.findAll();

        return listItems;
     }

}
