package com.todoapp.backend.modal;

public class ToDoItem {
    private String toDoID;
    private String toDoName;
    private int listID;
    private ToDoStatus toDoStatus;
    private ToDoDetails toDoDetails;


    public ToDoItem(String toDoName) {
        this.toDoName = toDoName;
    }
}
