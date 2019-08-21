package com.todoapp.backend;

import com.todoapp.backend.modal.ListItem;
import com.todoapp.backend.repository.ListItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DbSeeder implements CommandLineRunner {
    private ListItemRepository listItemRepository;

    public DbSeeder(ListItemRepository listItemRepository) {
        this.listItemRepository = listItemRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        ListItem listItem = new ListItem("deneme1");
        ListItem listItem2 = new ListItem("test2");

        this.listItemRepository.deleteAll();
        
        ArrayList<ListItem> listItems = new ArrayList<>();
        listItems.add(listItem);
        listItems.add(listItem2);

        this.listItemRepository.saveAll(listItems);
    }
}
