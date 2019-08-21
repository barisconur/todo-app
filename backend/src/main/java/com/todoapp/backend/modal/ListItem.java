package com.todoapp.backend.modal;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ListItems")
public class ListItem {
    @Id
    private static int listID = 1;
    private String listName;
    private ToDoItem toDoItem;

    public ListItem(String listName) {
        this.listName = listName;
        this.listID++;
    }

    public static int getListID() {
        return listID;
    }

    public String getListName() {
        return listName;
    }
}
